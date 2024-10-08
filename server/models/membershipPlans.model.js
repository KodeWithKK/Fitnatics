import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    orgPrice: {
      type: Number,
      required: true,
    },
    currPrice: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD", "EUR"],
      required: true,
    },
    totalOrders: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPayments: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      default: "Membership Plan",
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MembershipPlan = mongoose.model(
  "Membership Plan",
  membershipPlanSchema
);
