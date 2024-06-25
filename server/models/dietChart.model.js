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

const dietDaySchema = new mongoose.Schema(
  {
    breakfast: dietSchema,
    lunch: dietSchema,
    pre_workout: dietSchema,
    post_workout: dietSchema,
    dinner: dietSchema,
  },
  { _id: false }
);

const dietChartSchema = new mongoose.Schema(
  {
    bmiStart: {
      type: Number,
      required: true,
    },
    bmiEnd: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "underweight",
        "normal-weight",
        "overweight",
        "obese",
        "obese-class-2",
      ],
    },
    workoutExperience: {
      type: String,
      required: true,
      enum: ["beginner", "intermediate", "advanced"],
    },
    type: {
      type: String,
      required: true,
      enum: ["vegetarian", "non-vegetarian"],
    },
    dietChart: {
      monday: dietDaySchema,
      tuesday: dietDaySchema,
      wednesday: dietDaySchema,
      thursday: dietDaySchema,
      friday: dietDaySchema,
      saturday: dietDaySchema,
      sunday: dietDaySchema,
    },
  },
  {
    timestamps: true,
  }
);

export const DietChart = mongoose.model("Diet Chart", dietChartSchema);
