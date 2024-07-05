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
  repsUnit: {
    type: String,
    required: true,
    enum: ["number", "secs", "mins"],
  },
  rest: {
    type: Number,
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
});

export const WorkoutEntry = mongoose.model("Workout Entry", workoutEntrySchema);
