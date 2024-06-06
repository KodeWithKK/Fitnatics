import mongoose from "mongoose";

// Used with:

// signup-user-verification
// strategy-email-verification
// forget-password

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Otp = mongoose.model("Otp", otpSchema);
