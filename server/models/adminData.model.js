import mongoose from "mongoose";

const gymCoordinatesObjectSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const trainerPaymentsHistoryObjectSchema = new mongoose.Schema(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    gymCommission: {
      type: Number,
      rquired: true,
    },
  },
  {
    timestamps: true,
  }
);

const membershipsObjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trime: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    duration: {
      type: String,
      required: true,
      trime: true,
    },
  },
  {
    timestamps: true,
  }
);

const adminDataSchema = new mongoose.Schema(
  {
    gymName: {
      type: String,
      required: true,
    },
    gymLogo: {
      type: String,
    },
    gymLocation: {
      type: String,
    },
    gymCoordinates: gymCoordinatesObjectSchema,
    gymStartedSince: {
      type: Date,
      required: true,
    },
    trainerPaymentsHistory: [trainerPaymentsHistoryObjectSchema],
    memberships: [membershipsObjectSchema],
  },
  {
    timestamps: true,
  }
);

export const AdminData = mongoose.model("AdminData", adminDataSchema);
