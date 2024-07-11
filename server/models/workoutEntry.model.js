import mongoose from "mongoose";

const workoutEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  sets: {
    type: Boolean,
    required: true,
    default: false,
  },
  reps: {
    type: Boolean,
    required: true,
    default: false,
  },
  rest: {
    type: Boolean,
    required: true,
    default: false,
  },
  caloriesBurned: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const WorkoutEntry = mongoose.model("Workout Entry", workoutEntrySchema);
