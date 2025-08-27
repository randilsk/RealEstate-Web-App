// PaymentModel.js - Updated to work without user authentication

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
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

  stripeCustomerId: {
    type: String,
    required: true,
    index: true
  },

  // Subscription reference (optional for one-time payments)
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
    required: false
  },

  // Stripe payment identifiers
  stripePaymentIntentId: {
    type: String,
    required: false,
    index: true
  },

  stripeInvoiceId: {
    type: String,
    required: false,
    index: true
  },

  stripeChargeId: {
    type: String,
    required: false,
    index: true
  },

  // Payment details
  amount: {
    type: Number,
    required: true,
    min: 0
  },

  currency: {
    type: String,
    required: true,
    default: 'usd',
    uppercase: true
  },

  status: {
    type: String,
    enum: [
      'pending', 
      'succeeded', 
      'failed', 
      'canceled', 
      'refunded', 
      'partially_refunded'
    ],
    required: true,
    default: 'pending',
    index: true
  },

  paymentMethod: {
    type: String,
    enum: ['card', 'bank_transfer', 'paypal', 'other'],
    default: 'card'
  },

  // Payment description
  description: {
    type: String,
    required: false
  },

  // Receipt and invoice URLs
  receiptUrl: {
    type: String,
    required: false
  },

  invoiceUrl: {
    type: String,
    required: false
  },

  // Refund information
  refundAmount: {
    type: Number,
    default: 0,
    min: 0
  },

  refundReason: {
    type: String,
    required: false
  },

  refundedAt: {
    type: Date,
    required: false
  },

  // Failure information
  failureCode: {
    type: String,
    required: false
  },

  failureMessage: {
    type: String,
    required: false
  },

  // Metadata for additional information
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }

}, {
  timestamps: true
});

// Indexes for better query performance
paymentSchema.index({ customerEmail: 1, createdAt: -1 });
paymentSchema.index({ stripeCustomerId: 1, createdAt: -1 });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ subscriptionId: 1, createdAt: -1 });

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return `${this.currency.toUpperCase()} ${this.amount.toFixed(2)}`;
});

export default mongoose.model('Payment', paymentSchema);
