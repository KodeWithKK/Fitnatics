import mongoose from "mongoose";

const exerciseObjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  rest: {
    type: String,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
});

const exerciseDaySchema = new mongoose.Schema({
  dayType: {
    type: String,
    required: true,
  },
  exercises: [exerciseObjectSchema],
});

const exerciseChartSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true;
    },
    weight: {
      type: Number,
      required: true
    },
    data: [exerciseDaySchema],
  },
  {
    timestamps: true,
  }
);

export const ExerciseChart = mongoose.model(
  "ExerciseChart",
  exerciseChartSchema
);
