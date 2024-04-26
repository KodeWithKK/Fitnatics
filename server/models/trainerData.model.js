import mongoose from "mongoose";

const trainerDataSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    experienceUpdateAt: {
      type: Date,
    },
    certification: {
      type: String,
    },
    availability: {
      type: [String],
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    attendance: [Date],
    clientIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const TrainerData = mongoose.model("TrainerData", trainerDataSchema);
