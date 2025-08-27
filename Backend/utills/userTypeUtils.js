import Subscription from '../models/SubscriptionModel.js';

/**
 * Get user type based on their active subscription
 * @param {string} customerEmail - Customer email to check subscription for
 * @returns {Promise<string>} - User type: 'free', 'basic', 'pro', or 'premium'
 */
export const getUserType = async (customerEmail) => {
  try {
    if (!customerEmail) {
      return 'free';
    }

    // Find active subscription for the customer
    const subscription = await Subscription.findOne({
      customerEmail: customerEmail.toLowerCase(),
      status: { $in: ['active', 'trialing'] }
    });

    // Return plan type or default to 'free'
    return subscription?.planType || 'free';
  } catch (error) {
    console.error('Error getting user type:', error);
    return 'free'; // Default to free on error
  }
};

/**
 * Get detailed subscription info for a user
 * @param {string} customerEmail - Customer email to check subscription for
 * @returns {Promise<Object>} - Subscription details or null
 */
export const getUserSubscriptionDetails = async (customerEmail) => {
  try {
    if (!customerEmail) {
      return null;
    }

    const subscription = await Subscription.findOne({
      customerEmail: customerEmail.toLowerCase(),
      status: { $in: ['active', 'trialing', 'past_due'] }
    });

    if (!subscription) {
      return {
        userType: 'free',
        status: 'none',
        planType: 'free'
      };
    }

    return {
      userType: subscription.planType,
      status: subscription.status,
      planType: subscription.planType,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd
    };
  } catch (error) {
    console.error('Error getting subscription details:', error);
    return {
      userType: 'free',
      status: 'error',
      planType: 'free'
    };
  }
};

/**
 * Check if user has a specific plan type or higher
 * @param {string} customerEmail - Customer email
 * @param {string} requiredPlan - Required plan type ('basic', 'pro', 'premium')
 * @returns {Promise<boolean>} - Whether user has required plan or higher
 */
export const hasMinimumPlan = async (customerEmail, requiredPlan) => {
  const userType = await getUserType(customerEmail);
  
  const planHierarchy = {
    'free': 0,
    'basic': 1,
    'pro': 2,
    'premium': 3
  };

  const userLevel = planHierarchy[userType] || 0;
  const requiredLevel = planHierarchy[requiredPlan] || 0;

  return userLevel >= requiredLevel;
};
