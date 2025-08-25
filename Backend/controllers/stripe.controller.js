import stripe from '../config/stripe.js';
import Subscription from '../models/SubscriptionModel.js';
import Payment from '../models/PaymentModel.js';
import User from '../models/UserModel.js';

// Test authentication endpoint
export const testAuth = async (req, res) => {
  try {
    console.log('Test auth endpoint called');
    console.log('User from middleware:', req.user);
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    res.json({
      success: true,
      message: 'Authentication working',
      user: {
        id: req.user._id,
        email: req.user.email,
        username: req.user.username
      }
    });
  } catch (error) {
    console.error('Test auth error:', error);
    res.status(500).json({ error: 'Test auth failed' });
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
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: 'Failed to retrieve checkout session' });
  }
};

// Create a checkout session for subscription
export const createCheckoutSession = async (req, res) => {
  try {
    console.log('createCheckoutSession called with body:', req.body); // Debug log
    console.log('User from middleware:', req.user); // Debug log
    
    const { priceId, planType } = req.body;
    const userId = req.user._id; // From auth middleware - use _id for MongoDB

    console.log('Extracted data:', { priceId, planType, userId }); // Debug log

    if (!priceId || !planType) {
      return res.status(400).json({ error: 'Price ID and plan type are required' });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({
      userId,
      status: { $in: ['active', 'past_due'] }
    });

    if (existingSubscription) {
      return res.status(400).json({ 
        error: 'User already has an active subscription',
        subscriptionId: existingSubscription._id 
      });
    }

    // Create or retrieve Stripe customer
    let customer;
    if (user.stripeCustomerId) {
      customer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
        metadata: {
          userId: userId
        }
      });

      // Update user with Stripe customer ID
      await User.findByIdAndUpdate(userId, {
        stripeCustomerId: customer.id
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
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
        userId: userId,
        planType: planType
      },
      subscription_data: {
        metadata: {
          userId: userId,
          planType: planType
        }
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

// Handle successful payment (webhook)
export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
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

// Webhook handlers
async function handleCheckoutSessionCompleted(session) {
  const { userId, planType } = session.metadata;
  const subscription = await stripe.subscriptions.retrieve(session.subscription);

  // Create subscription record
  await Subscription.create({
    userId,
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
      userId,
      stripePaymentIntentId: session.payment_intent,
      amount: session.amount_total / 100,
      currency: session.currency,
      status: 'succeeded',
      description: `Subscription payment for ${planType} plan`,
    });
  }
}

async function handleInvoicePaymentSucceeded(invoice) {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: invoice.subscription
  });

  if (subscription) {
    // Update subscription
    await Subscription.findByIdAndUpdate(subscription._id, {
      status: 'active',
      lastPaymentDate: new Date(),
      nextBillingDate: new Date(invoice.next_payment_attempt * 1000),
    });

    // Create payment record
    await Payment.create({
      userId: subscription.userId,
      subscriptionId: subscription._id,
      stripePaymentIntentId: invoice.payment_intent,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      status: 'succeeded',
      description: `Recurring payment for ${subscription.planType} plan`,
      receiptUrl: invoice.hosted_invoice_url,
    });
  }
}

async function handleInvoicePaymentFailed(invoice) {
  const subscription = await Subscription.findOne({
    stripeSubscriptionId: invoice.subscription
  });

  if (subscription) {
    await Subscription.findByIdAndUpdate(subscription._id, {
      status: 'past_due',
    });
  }
}

async function handleSubscriptionUpdated(subscription) {
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
}

async function handleSubscriptionDeleted(subscription) {
  const dbSubscription = await Subscription.findOne({
    stripeSubscriptionId: subscription.id
  });

  if (dbSubscription) {
    await Subscription.findByIdAndUpdate(dbSubscription._id, {
      status: 'canceled',
    });
  }
}

// Get user's subscription details
export const getUserSubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findOne({
      userId,
      status: { $in: ['active', 'past_due'] }
    }).populate('userId', 'username email');

    if (!subscription) {
      return res.json({ subscription: null });
    }

    res.json({ subscription });
  } catch (error) {
    console.error('Error getting user subscription:', error);
    res.status(500).json({ error: 'Failed to get subscription details' });
  }
};

// Get user's payment history
export const getUserPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const payments = await Payment.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('subscriptionId', 'planType status');

    const total = await Payment.countDocuments({ userId });

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
    console.error('Error getting user payments:', error);
    res.status(500).json({ error: 'Failed to get payment history' });
  }
};

// Create customer portal session
export const createCustomerPortalSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.stripeCustomerId) {
      return res.status(404).json({ error: 'No subscription found' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/profile`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    res.status(500).json({ error: 'Failed to create customer portal session' });
  }
};

// Cancel subscription
export const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscription = await Subscription.findOne({
      userId,
      status: { $in: ['active', 'past_due'] }
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    // Cancel at period end
    const stripeSubscription = await stripe.subscriptions.update(
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

// Reactivate subscription
export const reactivateSubscription = async (req, res) => {
  try {
    const userId = req.user.id;
    const subscription = await Subscription.findOne({
      userId,
      status: { $in: ['active', 'past_due'] }
    });

    if (!subscription) {
      return res.status(404).json({ error: 'No subscription found' });
    }

    // Reactivate subscription
    const stripeSubscription = await stripe.subscriptions.update(
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
