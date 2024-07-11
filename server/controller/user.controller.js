import dayjs from "dayjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { DietChart } from "../models/dietChart.model.js";
import { WorkoutChart } from "../models/workoutChart.model.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";
import { WorkoutEntry } from "../models/workoutEntry.model.js";
import { DietEntry } from "../models/dietEntry.model.js";

import {
  checkEmailAvailabilitySchema,
  memberDataSchema,
} from "./schemas/user.schema.js";

const fetchUserData = asyncHandler(async (req, res) => {
  const user = req.user;

  const fetchedUser = await User.findById(user._id)
    .populate("memberDetails.fitness.dietChart")
    .populate("memberDetails.fitness.workoutChart")
    .select(
      "email accountSetupRequired role personalDetails.name personalDetails.avatar memberDetails.fitness.dietChart memberDetails.fitness.workoutChart -_id"
    );

  return res.status(200).json(new ApiResponse(200, fetchedUser));
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
    return res
      .status(400)
      .json(new ApiResponse(400, {}, { error: { message: "Invalid Role" } }));
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
            message: "A verified email is required to setup account",
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

  const avatarLocalPath = req?.files?.avatar?.[0]?.path;

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

  const membershipPlan = await MembershipPlan.findById(req.productId);

  if (!membershipPlan) {
    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          {},
          { error: { message: "Unauthorized Request!" } }
        )
      );
  }

  const planEndsIn = dayjs(req.productBoughtAt)
    .add(membershipPlan.duration, "month")
    .toDate();

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        role: role,
        accountSetupRequired: false,
        personalDetails: {
          name: req.body.name,
          avatar: avatar.url,
          phoneno: req.body.phone,
          gender: req.body.gender,
          dob: req.body.dob,
        },
        memberDetails: {
          fitness: {
            height: req.body.height,
            weight: req.body.weight,
            bmi: actualBmi,
            workoutExperience: req.body.workoutExperience,
            dietChart: userDietChart._id,
            workoutChart: userWorkoutChart._id,
          },
          membership: {
            membershipPlanId: req.productId,
            paymentId: req.paymentId,
            gymOutlet: req.body.gymOutlet,
            endsIn: planEndsIn,
          },
        },
      },
    },
    { new: true }
  );

  return res.status(200).json(new ApiResponse());
});

const getMemberTodaysDietEntry = asyncHandler(async (req, res) => {
  const user = req.user;
  const { dateString } = req.query;

  if (!dayjs(dateString, "YYYY-MM-DD", true).isValid()) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, { error: { message: "Invalid date format" } })
      );
  }

  if (user.role !== "member") {
    return res
      .status(401)
      .json(
        new ApiResponse(401, {}, { error: { message: "Unathorized Request" } })
      );
  }

  let diet = await DietEntry.findOne({
    userId: user._id,
    date: dateString,
  }).select("-userId -__v -date");

  if (!diet) {
    const dietChartId = user?.memberDetails?.fitness?.dietChartId;
    const dietChartDoc = await DietChart.findById(dietChartId);

    const dayMap = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const day = dayMap[dayjs(dateString, "YYYY-MM-DD").get("day")];
    const requiredDiet = dietChartDoc.dietChart[day];

    diet = await DietEntry.create({
      userId: user._id,
      date: dateString,
      breakfast: requiredDiet.breakfast,
      lunch: requiredDiet.lunch,
      pre_workout: requiredDiet.pre_workout,
      post_workout: requiredDiet.post_workout,
      dinner: requiredDiet.dinner,
    }).select("-userId -__v -date");
  }

  return res.status(200).json(new ApiResponse(200, diet));
});

const getMemberExerciseEntry = asyncHandler(async (req, res) => {
  const user = req.user;
  const { dateString } = req.query;

  if (!dayjs(dateString, "YYYY-MM-DD", true).isValid()) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, { error: { message: "Invalid date format" } })
      );
  }

  if (user.role !== "member") {
    return res
      .status(401)
      .json(
        new ApiResponse(401, {}, { error: { message: "Unathorized Request" } })
      );
  }

  let workout = await WorkoutEntry.findOne({
    userId: user._id,
    date: dateString,
  });

  if (!workout) {
    const workoutChartId = user?.memberDetails?.fitness?.workoutChartId;
    const workoutChartDoc = await WorkoutChart.findById(workoutChartId);
    const day = dayjs(dateString, "YYYY-MM-DD").get("day");
    const requiredWorkout = workoutChartDoc.workoutChart[(day + 6) % 7];
    workout = await WorkoutEntry.create({
      userId: user._id,
      date: dateString,
      ...requiredWorkout,
    });
  }

  return res.status(200).json(new ApiResponse(200, workout));
});

export {
  fetchUserData,
  checkEmailAvailability,
  setupAccount,
  getMemberTodaysDietEntry,
  getMemberExerciseEntry,
};
