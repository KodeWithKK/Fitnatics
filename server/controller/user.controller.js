import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { checkEmailAvailabilitySchema } from "./schemas/user.schema.js";

const getUserDataHandler = asyncHandler(async (req, res) => {
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

export { getUserDataHandler, checkEmailAvailability };
