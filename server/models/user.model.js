import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountSetupRequired: {
      type: Boolean,
      required: true,
      default: true,
    },
    phoneno: {
      type: Number,
      trim: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      lowercase: true,
    },
    clientDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientData",
    },
    traineDataId: {
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
