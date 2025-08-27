// SubscriptionModel.js - Updated to work without user authentication

import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  // User reference - now optional since we're removing auth
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Changed from true to false
    default: null
  },

  // Customer info for non-authenticated users
  customerEmail: {
    type: String,
    required: true, // Now required since we need to identify customers
    index: true
  },

  customerName: {
    type: String,
    required: false
  },

  // Stripe related fields
  stripeCustomerId: {
    type: String,
    required: true,
    index: true
  },

  stripeSubscriptionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  stripePriceId: {
    type: String,
    required: true
  },

  // Subscription details
  status: {
    type: String,
    enum: ['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid'],
    required: true,
    index: true
  },

  planType: {
    type: String,
    enum: ['basic', 'pro', 'premium'],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: 'usd'
  },

  // Billing cycle
  currentPeriodStart: {
    type: Date,
    required: true
  },

  currentPeriodEnd: {
    type: Date,
    required: true
  },

  cancelAtPeriodEnd: {
    type: Boolean,
    default: false
  },

  // Payment tracking
  lastPaymentDate: {
    type: Date
  },

  nextBillingDate: {
    type: Date
  },

  // Metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }

}, {
  timestamps: true
});

// Indexes for better performance
subscriptionSchema.index({ customerEmail: 1, status: 1 });
subscriptionSchema.index({ stripeCustomerId: 1, status: 1 });
subscriptionSchema.index({ createdAt: -1 });

export default mongoose.model('Subscription', subscriptionSchema);
