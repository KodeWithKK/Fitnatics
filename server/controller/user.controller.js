import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { checkEmailAvailabilitySchema } from "./schemas/user.schema.js";

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
  const paymentId = req.paymentId;

  console.log({ body: req.body });
  console.log({ avatar: req.files.avatar });

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

  return res.status(200).json(new ApiResponse());
});

export { fetchUserData, checkEmailAvailability, setupAccount };
