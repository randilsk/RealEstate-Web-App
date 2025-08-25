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
import { verifyTokenForStripe } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/config', getStripeConfig);
router.get('/checkout-session', getCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Test authentication route
router.get('/test-auth', verifyTokenForStripe, testAuth);

// Protected routes (require authentication)
router.post('/create-checkout-session', verifyTokenForStripe, createCheckoutSession);
router.get('/subscription', verifyTokenForStripe, getUserSubscription);
router.get('/payments', verifyTokenForStripe, getUserPayments);
router.post('/customer-portal', verifyTokenForStripe, createCustomerPortalSession);
router.post('/cancel-subscription', verifyTokenForStripe, cancelSubscription);
router.post('/reactivate-subscription', verifyTokenForStripe, reactivateSubscription);

export default router;
