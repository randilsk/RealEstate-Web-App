import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    stripePaymentIntentId: {
      type: String,
      required: true,
    },
    stripeInvoiceId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "usd",
    },
    status: {
      type: String,
      enum: ["succeeded", "processing", "requires_payment_method", "canceled", "failed"],
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    description: {
      type: String,
    },
    receiptUrl: {
      type: String,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
paymentSchema.index({ userId: 1 });
paymentSchema.index({ stripePaymentIntentId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

