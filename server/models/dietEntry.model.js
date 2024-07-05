import mongoose from "mongoose";

const dietSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

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
    type: dietSchema,
    required: true,
  },
  lunch: {
    type: dietSchema,
    required: true,
  },
  pre_workout: {
    type: dietSchema,
    required: true,
  },
  post_workout: {
    type: dietSchema,
    required: true,
  },
  dinner: {
    type: dietSchema,
    required: true,
  },
});

export const DietEntry = mongoose.model("Diet Entry", dietEntrySchema);
