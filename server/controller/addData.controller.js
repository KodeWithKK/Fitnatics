import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getUniqueId } from "../utils/getUniqueId.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";

const membershipPlanDataHandler = asyncHandler(async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          title: "Data not found!",
          message: "send data to fill the membershipPlanData",
        }
      )
    );
  }

  const hasMultipleData = Array.isArray(data);
  const currency = "INR";
  const type = "MEMBERSHIP-PLAN";

  /* HAS MULTIPLE DATA */
  if (hasMultipleData) {
    for (const plan of data) {
      if (!(typeof plan === "object" && !Array.isArray(plan))) {
        return res.status(400).json(
          new ApiResponse(
            400,
            {},
            {
              title: "Incorrect data type of plan",
              message: "Plan must be an object",
            }
          )
        );
      }

      plan.currency = currency;
      plan.type = type;
      plan.planId = await getUniqueId(MembershipPlan, "planId");
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
  }

  /* HAS SINGLE DATA */
  if (!(typeof data === "object" && !Array.isArray(data))) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          title: "Incorrect data type of plan",
          message: "Plan must be an object",
        }
      )
    );
  }

  data.currency = currency;
  data.type = type;
  data.planId = await getUniqueId(MembershipPlan, "planId");

  // inserting the document
  const membershipPlan = await MembershipPlan.create(data);

  if (!membershipPlan) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          title: "Something went wrong!",
          message: "Something went wrong while creating the document",
        }
      )
    );
  }

  return res.status(200).json(new ApiResponse(200, { membershipPlan }));
});

export { membershipPlanDataHandler };
