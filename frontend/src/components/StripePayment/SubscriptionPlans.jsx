import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$0.00',
      period: 'month',
      features: [
        'Up to 5 property listings',
        'Basic search filters',
        'Email support',
        'Standard listing features'
      ],
      popular: false
    },
    // Added missing 'pro' plan that's referenced in handleSubscribe
   
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$29.99',
      period: 'month',
      features: [
        'Unlimited property listings',
        'All Pro features',
        'Premium support',
        'Advanced analytics',
        'Custom branding',
        'API access',
        'Priority listing placement'
      ],
      popular: false
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Fetch Stripe configuration
    fetchStripeConfig();
  }, []);

  const fetchStripeConfig = async () => {
    try {
      console.log('Fetching Stripe config...'); // Debug log
      const response = await fetch('http://localhost:3000/api/stripe/config', {
        credentials: 'include'
      });
      const data = await response.json();
      
      console.log('Stripe config response:', data); // Debug log
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch Stripe config');
      }
      
      // Check if price IDs are present
      if (!data.basicPriceId || !data.proPriceId || !data.premiumPriceId) {
        console.error('Missing price IDs in config:', data);
        alert('Payment configuration is incomplete. Please contact support.');
        return;
      }
      
      setConfig(data);
      console.log('Stripe config set successfully'); // Debug log
    } catch (error) {
      console.error('Error fetching Stripe config:', error);
      // Show user-friendly error message
      alert('Failed to load payment configuration. Please try again later.');
    }
  };

  const handleSubscribe = async (planId) => {
    console.log('Attempting to subscribe to plan:', planId); // Debug log
    
    if (!config) {
      alert('Payment system is not ready. Please wait a moment and try again.');
      return;
    }

    // Handle free basic plan differently
    if (planId === 'basic') {
      alert('Basic plan is free! You can start using it immediately after signing up.');
      return;
    }

    setLoading(true);

    try {
      // Test authentication first
      console.log('Testing authentication...'); // Debug log
      const authTestResponse = await fetch('http://localhost:3000/api/stripe/test-auth', {
        credentials: 'include'
      });
      
      console.log('Auth test response status:', authTestResponse.status); // Debug log
      
      if (!authTestResponse.ok) {
        const authData = await authTestResponse.json();
        console.log('Auth test failed:', authData); // Debug log
        alert('Authentication error. Please sign in again.');
        window.location.href = '/sign_in';
        return;
      }
      
      const authData = await authTestResponse.json();
      console.log('Auth test successful:', authData); // Debug log

      // Since we're using HTTP-only cookies, we don't need to manually extract the token
      // The backend will automatically receive the access_token cookie

      // Get price ID based on plan - with validation
      let priceId;
      switch (planId) {
        case 'basic':
          priceId = config.basicPriceId;
          break;
        case 'pro':
          priceId = config.proPriceId;
          break;
        case 'premium':
          priceId = config.premiumPriceId;
          break;
        default:
          throw new Error(`Invalid plan selected: ${planId}`);
      }

      console.log('Selected plan:', planId, 'Price ID:', priceId); // Debug log

      if (!priceId) {
        console.error('Config object:', config); // Debug log
        throw new Error(`Price ID not found for plan: ${planId}`);
      }

      console.log('Creating checkout session for:', { planId, priceId }); // Debug log

      // Create checkout session
      const response = await fetch('http://localhost:3000/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          priceId,
          planType: planId
        })
      });

      const data = await response.json();
      console.log('Checkout session response:', data); // Debug log
      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        // Handle authentication errors specifically
        if (response.status === 401) {
          alert('Authentication error. Please sign in again.');
          // Redirect to sign in page
          window.location.href = '/sign_in';
          return;
        }
        throw new Error(data.error || data.message || `HTTP ${response.status}: Failed to create checkout session`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.url) {
        throw new Error('No checkout URL received from server');
      }

      // Redirect to Stripe Checkout
      console.log('Redirecting to:', data.url); // Debug log
      window.location.href = data.url;

    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      // More specific error messages
      if (error.message.includes('fetch')) {
        alert('Network error. Please check your internet connection and try again.');
      } else if (error.message.includes('401') || error.message.includes('403')) {
        alert('Authentication error. Please sign in again.');
      } else if (error.message.includes('500')) {
        alert('Server error. Please try again later or contact support.');
      } else {
        alert(`Payment error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Select the perfect plan for your real estate needs
          </p>
          {!config && (
            <p className="text-sm text-orange-600 mt-2">
              Loading payment system...
            </p>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-lg shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading || (!config && plan.id !== 'basic')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading 
                    ? 'Processing...' 
                    : plan.id === 'basic' 
                      ? 'Get Started Free' 
                      : 'Subscribe Now'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All paid plans include a 30-day money-back guarantee
          </p>
          <p className="text-sm text-gray-500">
            Need help choosing? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;