import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "Unauthorized request!",
            message: "Kindly login again to generate required credentials",
          },
        }
      )
    );
  }

  // getting the user id
  let decodedUserId = undefined;
  let newAccessTokenRequired = false;

  // decoding access token
  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    decodedUserId = decodedAccessToken?._id;
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json(
          new ApiResponse(
            401,
            {},
            {
              error: {
                title: "Session Expired!",
                message:
                  "Your session for this account has expired. Please login again",
              },
            }
          )
        );
      }

      // decoding refresh token
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        decodedUserId = decodedRefreshToken?._id;
      } catch (error) {
        return res.status(401).json(
          new ApiResponse(
            401,
            {},
            {
              error: {
                title: "Session Expired!",
                message:
                  "Your session for this account has expired. Please login again",
              },
            }
          )
        );
      }
    } else {
      return res.status(401).json(
        new ApiResponse(
          401,
          {},
          {
            error: {
              title: "Unauthorized request!",
              message: "Kindly login again to generate required credentials",
            },
          }
        )
      );
    }
  }

  if (!decodedUserId) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "Unauthorized request!",
            message: "Kindly login again to generate required credentials",
          },
        }
      )
    );
  }

  const user = await User.findById(decodedUserId);

  if (!user) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "Unauthorized request!",
            message: "Kindly login again to generate required credentials",
          },
        }
      )
    );
  }

  if (newAccessTokenRequired) {
    const newRefreshToken = user.generateRefreshToken();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
    });
  }

  req.user = user;
  next();
});
