import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "INR",
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "productType",
  },
  productType: {
    type: String,
    enum: ["Membership Plan"],
    required: true,
  },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILED", "PENDING"],
    default: "PENDING",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
