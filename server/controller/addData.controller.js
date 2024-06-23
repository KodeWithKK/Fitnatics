import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";
import { DietChart } from "../models/dietChart.model.js";
import { WorkoutChart } from "../models/workoutChart.model.js";

import {
  membershipPlanSchema,
  dietSchema,
  workoutChartSchema,
} from "./schemas/addData.schema.js";

const membershipPlan = asyncHandler(async (req, res) => {
  const { data } = req.body;

  const { error } = await resolveSchema(membershipPlanSchema, data);

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  for (const plan of data) {
    const planRecord = await MembershipPlan.findOne({
      duration: plan.duration,
    });

    if (planRecord) {
      await MembershipPlan.findByIdAndUpdate(planRecord._id, {
        set: {
          isActive: false,
        },
      });
    }
  }

  // Inserting all the documents
  const membershipPlans = await MembershipPlan.insertMany(data);

  if (!MembershipPlan) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          title: "Something went wrong!",
          message: "Something went wrong while inserting documents",
        }
      )
    );
  }

  return res.status(200).json(new ApiResponse(200, { membershipPlans }));
});

const dietChart = asyncHandler(async (req, res) => {
  const { data } = req.body;

  const { error } = await resolveSchema(dietSchema, data);

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  for (const dietChart of data) {
    const bmi = dietChart.bmi;
    const bmiSplit = bmi.split("-");
    dietChart.bmiStart = Number(bmiSplit[0]);
    dietChart.bmiEnd = Number(bmiSplit[1]);
    delete dietChart.bmi;
  }

  const dietChartRecords = await DietChart.insertMany(data);

  return res.status(200).json(new ApiResponse(200, { dietChartRecords }));
});

const workoutChart = asyncHandler(async (req, res) => {
  const { data } = req.body;

  const { error } = await resolveSchema(workoutChartSchema, data);

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  for (const workoutChart of data) {
    const bmi = workoutChart.bmi;
    const bmiSplit = bmi.split("-");
    workoutChart.bmiStart = Number(bmiSplit[0]);
    workoutChart.bmiEnd = Number(bmiSplit[1]);
    delete workoutChart.bmi;
  }

  const workoutChartRecords = await WorkoutChart.insertMany(data);
  return res.status(200).json(new ApiResponse(200, { workoutChartRecords }));
});

export { membershipPlan, dietChart, workoutChart };
