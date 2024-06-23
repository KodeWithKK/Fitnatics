import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { DietChart } from "../models/dietChart.model.js";
import { WorkoutChart } from "../models/workoutChart.model.js";

import {
  checkEmailAvailabilitySchema,
  memberDataSchema,
} from "./schemas/user.schema.js";

const fetchUserData = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json(new ApiResponse(200, user));
});

const checkEmailAvailability = asyncHandler(async (req, res) => {
  const { email } = req.query;

  const { error } = await resolveSchema(checkEmailAvailabilitySchema, {
    email,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(200)
      .json(new ApiResponse(200, { isEmailAvailable: false }));
  }

  return res.status(200).json(new ApiResponse(200, { isEmailAvailable: true }));
});

const setupAccount = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!(typeof role == "string" && ["member"].includes(role))) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Invalid Role!",
            message: "A valid role is required to setup your account",
          },
        }
      )
    );
  }

  const user = req.user;

  if (!user?.email) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "Unauthorized Request!",
            message: "Email Verification is required to purchase products",
          },
        }
      )
    );
  }

  const { error } = await resolveSchema(memberDataSchema, {
    name: req.body?.name,
    gender: req.body?.gender,
    dob: req.body?.dob,
    phoneno: req.body?.phoneno,
    weight: req.body?.weight,
    height: req.body?.height,
    workoutExperience: req.body?.workoutExperience,
    gymOutlet: req.body?.gymOutlet,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  const avatarLocalPath = req?.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Profile Picture not Found!",
            message: "Profile Picture is required to setup account",
          },
        }
      )
    );
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar?.url) {
    return res.status(500).json(
      new ApiResponse(
        500,
        {},
        {
          error: {
            title: "Something went wrong!",
            message: "Something went wrong while uploading image to the server",
          },
        }
      )
    );
  }

  const heightInMeter = req.body.height / 100;
  const weightInKg = req.body.weight;

  const actualBmi = (weightInKg / Math.pow(heightInMeter, 2)).toFixed(1);
  let searchBmi = actualBmi;

  if (searchBmi < 16) {
    searchBmi = 16;
  } else if (searchBmi > 39.9) {
    searchBmi = 39.9;
  }

  const userDietChart = await DietChart.findOne({
    bmiStart: { $lte: searchBmi },
    bmiEnd: { $gte: searchBmi },
  });

  const userWorkoutChart = await WorkoutChart.findOne({
    bmiStart: { $lte: searchBmi },
    bmiEnd: { $gte: searchBmi },
  });

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        role: role,
        avatar: avatar.url,
        name: req.body.name,
        phoneno: req.body.phone,
        accountSetupRequired: false,
        gender: req.body.gender,
        dob: req.body.dob,
        fitnessRecords: {
          height: req.body.height,
          weight: req.body.weight,
          workoutExperience: req.body.workoutExperience,
          bmi: actualBmi,
          dietChartId: userDietChart._id,
          workoutChartId: userWorkoutChart._id,
        },
        membershipDetails: {
          membershipPlanId: req.productId,
          paymentId: req.paymentId,
          gymOutlet: req.body.gymOutlet,
          endsIn: new Date(),
        },
      },
    },
    { new: true }
  );

  return res.status(200).json(new ApiResponse());
});

export { fetchUserData, checkEmailAvailability, setupAccount };
