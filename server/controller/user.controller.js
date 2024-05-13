import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserDataHandler = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(200).json(new ApiResponse(200, user));
});

export { getUserDataHandler };
