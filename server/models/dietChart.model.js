import mongoose from "mongoose";

const dietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  carbs: {
    type: Number,
  },
});

const dietDaySchema = new mongoose.Schema({
  day: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    required: true,
  },
  breakfast: dietSchema,
  lunch: dietSchema,
  pre_workout: dietSchema,
  post_workout: dietSchema,
  dinner: dietSchema,
});

const dietChartSchema = new mongoose.Schema(
  {
    data: [dietDaySchema],
  },
  {
    timestamps: true,
  }
);

export const DietChart = mongoose.model("DietChart", dietChartSchema);
