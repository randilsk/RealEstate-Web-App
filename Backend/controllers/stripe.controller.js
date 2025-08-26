import stripe from '../config/stripe.js';
import Subscription from '../models/SubscriptionModel.js';
import Payment from '../models/PaymentModel.js';
import User from '../models/UserModel.js';

// Test endpoint (no auth required)
export const testAuth = async (req, res) => {
  try {
    console.log('Test endpoint called - no auth required');
    
    res.json({
      success: true,
      message: 'API is working - no authentication required',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ error: 'Test endpoint failed' });
  }
};

// Get Stripe configuration (publishable key and price IDs)
export const getStripeConfig = async (req, res) => {
  try {
    res.json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      basicPriceId: process.env.STRIPE_BASIC_PRICE_ID,
      proPriceId: process.env.STRIPE_PRO_PRICE_ID,
      premiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID,
    });
  } catch (error) {
    console.error('Error getting Stripe config:', error);
    res.status(500).json({ error: 'Failed to get Stripe configuration' });
  }
};

// Fetch checkout session details
export const getCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.query;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required'});
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: 'Failed to retrieve checkout session' });
  }
};

// Create a checkout session for subscription (NO AUTH REQUIRED)
export const createCheckoutSession = async (req, res) => {
  try {
    console.log('createCheckoutSession called with body:', req.body);
    
    const { priceId, planType, customerEmail, customerName } = req.body;

    console.log('Extracted data:', { priceId, planType, customerEmail, customerName });

    if (!priceId || !planType) {
      return res.status(400).json({ error: 'Price ID and plan type are required' });
    }

    // Create or find customer by email (if provided)
    let customer = null;
    if (customerEmail) {
      // Try to find existing customer
      const existingCustomers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName || undefined,
          metadata: {
            planType: planType,
            source: 'web-subscription'
          }
        });
      }
    }

    // Create checkout session
    const sessionConfig = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        planType: planType,
        source: 'web-subscription'
      },
      subscription_data: {
        metadata: {
          planType: planType,
          source: 'web-subscription'
        }
      },
      // Collect customer info during checkout if not provided
      billing_address_collection: 'required',
    };

    // Add customer if we have one
    if (customer) {
      sessionConfig.customer = customer.id;
    } else {
      // Let Stripe collect customer email during checkout
      sessionConfig.customer_email = customerEmail || undefined;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
};

// Handle Stripe webhooks
export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};

// Webhook handlers (updated to work without user authentication)
async function handleCheckoutSessionCompleted(session) {
  try {
    const { planType } = session.metadata;
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    const customer = await stripe.customers.retrieve(session.customer);

    // Create subscription record (without userId since no auth)
    await Subscription.create({
      userId: null, // No user authentication
      customerEmail: customer.email,
      customerName: customer.name,
      stripeCustomerId: session.customer,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      planType,
      amount: subscription.items.data[0].price.unit_amount / 100,
      currency: subscription.currency,
    });

    // Create payment record
    if (session.payment_intent) {
      await Payment.create({
        userId: null, // No user authentication
        customerEmail: customer.email,
        stripeCustomerId: session.customer,
        stripePaymentIntentId: session.payment_intent,
        amount: session.amount_total / 100,
        currency: session.currency,
        status: 'succeeded',
        description: `Subscription payment for ${planType} plan`,
      });
    }
  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

async function handleInvoicePaymentSucceeded(invoice) {
  try {
    const subscription = await Subscription.findOne({
      stripeSubscriptionId: invoice.subscription
    });

    if (subscription) {
      // Update subscription
      await Subscription.findByIdAndUpdate(subscription._id, {
        status: 'active',
        lastPaymentDate: new Date(),
        nextBillingDate: invoice.next_payment_attempt ? new Date(invoice.next_payment_attempt * 1000) : null,
      });

      // Create payment record
      await Payment.create({
        userId: subscription.userId,
        customerEmail: subscription.customerEmail,
        subscriptionId: subscription._id,
        stripeCustomerId: subscription.stripeCustomerId,
        stripePaymentIntentId: invoice.payment_intent,
        stripeInvoiceId: invoice.id,
        amount: invoice.amount_paid / 100,
        currency: invoice.currency,
        status: 'succeeded',
        description: `Recurring payment for ${subscription.planType} plan`,
        receiptUrl: invoice.hosted_invoice_url,
      });
    }
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error);
  }
}

async function handleInvoicePaymentFailed(invoice) {
  try {
    const subscription = await Subscription.findOne({
      stripeSubscriptionId: invoice.subscription
    });

    if (subscription) {
      await Subscription.findByIdAndUpdate(subscription._id, {
        status: 'past_due',
      });
    }
  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}

async function handleSubscriptionUpdated(subscription) {
  try {
    const dbSubscription = await Subscription.findOne({
      stripeSubscriptionId: subscription.id
    });

    if (dbSubscription) {
      await Subscription.findByIdAndUpdate(dbSubscription._id, {
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      });
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

async function handleSubscriptionDeleted(subscription) {
  try {
    const dbSubscription = await Subscription.findOne({
      stripeSubscriptionId: subscription.id
    });

    if (dbSubscription) {
      await Subscription.findByIdAndUpdate(dbSubscription._id, {
        status: 'canceled',
      });
    }
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

// Get subscription by customer email or ID (NO AUTH REQUIRED)
export const getUserSubscription = async (req, res) => {
  try {
    const { customerEmail, customerId } = req.query;

    if (!customerEmail && !customerId) {
      return res.status(400).json({ error: 'Customer email or ID is required' });
    }

    let subscription;
    if (customerId) {
      subscription = await Subscription.findOne({
        stripeCustomerId: customerId,
        status: { $in: ['active', 'past_due'] }
      });
    } else {
      subscription = await Subscription.findOne({
        customerEmail,
        status: { $in: ['active', 'past_due'] }
      });
    }

    if (!subscription) {
      return res.json({ subscription: null });
    }

    res.json({ subscription });
  } catch (error) {
    console.error('Error getting subscription:', error);
    res.status(500).json({ error: 'Failed to get subscription details' });
  }
};

// Get payment history by customer email or ID (NO AUTH REQUIRED)
export const getUserPayments = async (req, res) => {
  try {
    const { customerEmail, customerId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!customerEmail && !customerId) {
      return res.status(400).json({ error: 'Customer email or ID is required' });
    }

    let query = {};
    if (customerId) {
      query.stripeCustomerId = customerId;
    } else {
      query.customerEmail = customerEmail;
    }

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('subscriptionId', 'planType status');

    const total = await Payment.countDocuments(query);

    res.json({
      payments,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error getting payments:', error);
    res.status(500).json({ error: 'Failed to get payment history' });
  }
};

// Create customer portal session (NO AUTH REQUIRED)
export const createCustomerPortalSession = async (req, res) => {
  try {
    const { customerId, customerEmail } = req.body;

    if (!customerId && !customerEmail) {
      return res.status(400).json({ error: 'Customer ID or email is required' });
    }

    let stripeCustomerId = customerId;

    // If only email provided, find the customer
    if (!stripeCustomerId && customerEmail) {
      const subscription = await Subscription.findOne({ customerEmail });
      if (subscription) {
        stripeCustomerId = subscription.stripeCustomerId;
      }
    }

    if (!stripeCustomerId) {
      return res.status(404).json({ error: 'No subscription found for this customer' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/subscription`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    res.status(500).json({ error: 'Failed to create customer portal session' });
  }
};

// Cancel subscription (NO AUTH REQUIRED)
export const cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId, customerId, customerEmail } = req.body;

    if (!subscriptionId && !customerId && !customerEmail) {
      return res.status(400).json({ error: 'Subscription ID, customer ID, or email is required' });
    }

    let subscription;
    if (subscriptionId) {
      subscription = await Subscription.findById(subscriptionId);
    } else if (customerId) {
      subscription = await Subscription.findOne({
        stripeCustomerId: customerId,
        status: { $in: ['active', 'past_due'] }
      });
    } else {
      subscription = await Subscription.findOne({
        customerEmail,
        status: { $in: ['active', 'past_due'] }
      });
    }

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    // Cancel at period end
    await stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      {
        cancel_at_period_end: true,
      }
    );

    // Update local subscription
    await Subscription.findByIdAndUpdate(subscription._id, {
      cancelAtPeriodEnd: true,
    });

    res.json({ 
      message: 'Subscription will be canceled at the end of the current period',
      cancelAtPeriodEnd: true
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
};

// Reactivate subscription (NO AUTH REQUIRED)
export const reactivateSubscription = async (req, res) => {
  try {
    const { subscriptionId, customerId, customerEmail } = req.body;

    if (!subscriptionId && !customerId && !customerEmail) {
      return res.status(400).json({ error: 'Subscription ID, customer ID, or email is required' });
    }

    let subscription;
    if (subscriptionId) {
      subscription = await Subscription.findById(subscriptionId);
    } else if (customerId) {
      subscription = await Subscription.findOne({
        stripeCustomerId: customerId,
        status: { $in: ['active', 'past_due'] }
      });
    } else {
      subscription = await Subscription.findOne({
        customerEmail,
        status: { $in: ['active', 'past_due'] }
      });
    }

    if (!subscription) {
      return res.status(404).json({ error: 'No subscription found' });
    }

    // Reactivate subscription
    await stripe.subscriptions.update(
      subscription.stripeSubscriptionId,
      {
        cancel_at_period_end: false,
      }
    );

    // Update local subscription
    await Subscription.findByIdAndUpdate(subscription._id, {
      cancelAtPeriodEnd: false,
    });

    res.json({ 
      message: 'Subscription reactivated successfully',
      cancelAtPeriodEnd: false
    });
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    res.status(500).json({ error: 'Failed to reactivate subscription' });
  }
};