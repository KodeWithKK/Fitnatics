import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: String,
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
  },
  { _id: false }
);

const exerciseDaySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      required: true,
    },
    dayType: {
      type: String,
      required: true,
    },
    exercises: [exerciseSchema],
  },
  { _id: false }
);

const workoutChartSchema = new mongoose.Schema(
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
      enum: [
        "underweight",
        "normal-weight",
        "overweight",
        "obese",
        "obese-class-2",
      ],
      required: true,
    },
    workoutExperience: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    workoutChart: [exerciseDaySchema],
  },
  {
    timestamps: true,
  }
);

export const WorkoutChart = mongoose.model("Workout Chart", workoutChartSchema);
