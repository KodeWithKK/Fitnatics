import mongoose from "mongoose";

const membershipObjectSchema = new mongoose.Schema(
  {
    membershipType: {
      type: String,
      enum: ["Monthly", "Quarterly", "Yearly"],
      default: "Monthly",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const nutritionGoalObjectSchema = new mongoose.Schema({
  carbs: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
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
});

const nutritionHistoryObjectSchema = new mongoose.Schema({
  target: nutritionGoalObjectSchema,
  achived: nutritionGoalObjectSchema,
});

const trainerHistoryObjectSchema = new mongoose.Schema(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hiredAt: {
      type: Date,
      required: true,
    },
    hiredTill: {
      type: Date,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const clientDataSchema = new mongoose.Schema(
  {
    memberships: [membershipObjectSchema],
    attendance: [Date],
    nutritionGoal: nutritionGoalObjectSchema,
    nutritionHistory: [nutritionHistoryObjectSchema],
    activeDietId: {
      type: mongoose.Types.ObjectId,
      ref: "DietChart",
    },
    activeExerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseChart",
    },
    tainerHistory: [trainerHistoryObjectSchema],
  },
  {
    timestamps: true,
  }
);

export const ClientData = mongoose.model("ClientData", clientDataSchema);
