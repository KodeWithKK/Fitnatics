import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const fitnessRecordsSchema = new mongoose.Schema(
  {
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    workoutChartData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout Chart",
    },
    dietChartData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diet Chart",
    },
    workoutExperience: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
  },
  { _id: false }
);

const membershipDetails = new mongoose.Schema(
  {
    membershipPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership Plan",
      required: true,
    },
    startsIn: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endsIn: {
      type: Date,
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    gymOutlet: {
      type: String,
      enum: ["noida", "prayagraj"],
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      trim: true,
      required: true,
      enum: ["local", "google", "facebook", "twitter"],
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // don't include if it's not defined or set to null
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
    twitterId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["member", "trainer", "admin"],
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneno: {
      type: Number,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dob: {
      type: String,
    },
    accountSetupRequired: {
      type: Boolean,
      required: true,
      default: true,
    },
    fitnessRecords: fitnessRecordsSchema,
    membershipDetails: membershipDetails,

    trainerDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerData",
    },
    adminDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminData",
    },
  },
  { timestamps: true }
);

// check before saving up the content
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Custom Methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
