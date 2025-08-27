import express from 'express';
import {
  testAuth,
  getStripeConfig,
  getCheckoutSession,
  createCheckoutSession,
  handleWebhook,
  getUserSubscription,
  getUserPayments,
  createCustomerPortalSession,
  cancelSubscription,
  reactivateSubscription
} from '../controllers/stripe.controller.js';
// Removed: import { verifyTokenForStripe } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes are now public (no authentication required)
router.get('/config', getStripeConfig);
router.get('/checkout-session', getCheckoutSession);

// Webhook route (raw body parsing handled in main server)
router.post('/webhook', handleWebhook);

// Previously protected routes - now public
router.post('/create-checkout-session', createCheckoutSession);
router.get('/subscription', getUserSubscription);
router.get('/payments', getUserPayments);
router.post('/customer-portal', createCustomerPortalSession);
router.post('/cancel-subscription', cancelSubscription);
router.post('/reactivate-subscription', reactivateSubscription);

// Test route (optional - you can remove this)
router.get('/test-auth', testAuth);

export default router;