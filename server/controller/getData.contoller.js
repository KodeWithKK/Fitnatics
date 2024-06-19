import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";

const getMembershipPlansDataHandler = asyncHandler(async (req, res) => {
  const membershipPlans = await MembershipPlan.find().select(
    "-totalOrders -totalPayments -__v -createdAt -updatedAt"
  );

  return res.status(200).json(new ApiResponse(200, { data: membershipPlans }));
});

export { getMembershipPlansDataHandler };
