import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";

const getMembershipPlansDataHandler = asyncHandler(async (req, res) => {
  const membershipPlans = await MembershipPlan.find().select(
    "planId duration orgPrice currPrice currency type features -_id"
  );

  return res.status(200).json(new ApiResponse(200, { data: membershipPlans }));
});

export { getMembershipPlansDataHandler };
