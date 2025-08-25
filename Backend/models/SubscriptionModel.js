import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
    },
    stripePriceId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "canceled", "past_due", "unpaid", "incomplete"],
      default: "incomplete",
    },
    currentPeriodStart: {
      type: Date,
      required: true,
    },
    currentPeriodEnd: {
      type: Date,
      required: true,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    planType: {
      type: String,
      enum: ["basic", "pro", "premium"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "usd",
    },
    paymentMethod: {
      type: String,
    },
    lastPaymentDate: {
      type: Date,
    },
    nextBillingDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
subscriptionSchema.index({ userId: 1 });
subscriptionSchema.index({ stripeCustomerId: 1 });
subscriptionSchema.index({ status: 1 });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;

