import mongoose from "mongoose";

const dietEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  breakfast: {
    type: Boolean,
    required: true,
    default: false,
  },
  lunch: {
    type: Boolean,
    required: true,
    default: false,
  },
  pre_workout: {
    type: Boolean,
    required: true,
    default: false,
  },
  post_workout: {
    type: Boolean,
    required: true,
    default: false,
  },
  dinner: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const DietEntry = mongoose.model("Diet Entry", dietEntrySchema);
