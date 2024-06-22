import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";

import { membershipPlanSchema } from "./schemas/addData.schema.js";

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

export { membershipPlan };
