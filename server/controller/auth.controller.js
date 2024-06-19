import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { transporter } from "../config/mailer.js";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import crypto from "crypto";

import {
  localLoginSchema,
  signupOTPGenerationSchema,
  signupOTPVerificationSchema,
  stategyEmailOTPGenerationSchema,
  stategyEmailOTPVerificationSchema,
} from "./schemas/auth.schema.js";

const localLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { error } = await resolveSchema(localLoginSchema, { email, password });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  const user = await User.findOne({ email });

  if (user && user.provider !== "local") {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "User already exists!",
            message: `An account with this email already created using ${user.provider}`,
          },
        }
      )
    );
  }

  if (!user) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "User doesn't exist!",
            message: "Create a new account, entered user doesn't exist",
          },
        }
      )
    );
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "Incorrect Password!",
            message: "Enter the Correct Password",
          },
        }
      )
    );
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {}, "User Found"));
});

const singupOTPGeneration = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { error } = await resolveSchema(signupOTPGenerationSchema, {
    email,
    password,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  await Otp.deleteOne({ email, password });

  const otp = await Otp.create({
    email,
    password,
    otp: crypto
      .randomInt(0, 10 ** 6)
      .toString()
      .padStart(6, "0"),
  });

  if (!otp) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "OTP Generation Failed!",
            message: "Something went wrong while generating the otp",
          },
        }
      )
    );
  }

  setTimeout(async () => {
    await Otp.deleteOne({ _id: otp?._id });
  }, 15 * 60 * 1000);

  const mailOptions = {
    from: "kodewithkk@gmail.com",
    to: email,
    subject: "OTP for account Verifcation!",
    text: `${otp.otp} is your OTP for your account verification.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP sent to your email"));
});

const singupOTPVerification = asyncHandler(async (req, res) => {
  const { email, password, otp } = req.body;

  const { error } = await resolveSchema(signupOTPVerificationSchema, {
    email,
    password,
    otp,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  const otpDoc = await Otp.findOne({ email, password });

  if (!otpDoc) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "Unauthorized Request!",
            message: "No OTP is found with this email and password",
          },
        }
      )
    );
  }

  if (otpDoc.otp !== otp) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Incorrect OTP!",
            message:
              "Entered OTP is incorrect. Try again or click on resend code.",
          },
        }
      )
    );
  }

  await otpDoc.deleteOne();

  const user = await User.create({
    provider: "local",
    email,
    password,
    accountSetupRequired: true,
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  return res
    .status(202)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(202, {}, "OTP is Valid"));
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully"));
});

const strategyCallback = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, error } = req?.user;

  if (error) {
    return res
      .status(400)
      .redirect("http://localhost:5173/error/account-already-exists");
  }

  const options = {
    httpOnly: true, // cannot be accessed via client-side scripts
    secure: true, // will only be sent over HTTPS
  };

  if (!accessToken || !refreshToken) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          {
            error: {
              title: "Something went wrong!",
              message: "Something went wrong while generating the tokens",
            },
          }
        )
      )
      .cookie("authStatus", "failed")
      .clearCookie("connect.sid", options)
      .redirect("http://localhost:5173/");
  }

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .clearCookie("connect.sid")
    .redirect("http://localhost:5173/");
});

const stategyEmailOTPGeneration = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const { error } = await resolveSchema(stategyEmailOTPGenerationSchema, {
    email,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Email already exists!",
            message: "A user with this email already exists",
          },
        }
      )
    );
  }

  await Otp.deleteOne({ email });

  const otp = await Otp.create({
    email,
    otp: crypto
      .randomInt(0, 10 ** 6)
      .toString()
      .padStart(6, "0"),
  });

  if (!otp) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "OTP Generation Failed!",
            message: "Something went wrong while generating the otp",
          },
        }
      )
    );
  }

  setTimeout(async () => {
    await Otp.deleteOne({ _id: otp?._id });
  }, 15 * 60 * 1000);

  const mailOptions = {
    from: "Fitnatics",
    to: email,
    subject: "OTP for email Verifcation!",
    text: `${otp.otp} is your OTP for email verification.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP sent to your email"));
});

const stategyEmailOTPVerification = asyncHandler(async (req, res) => {
  const { email, otp } = req.query;
  const user = req.user;

  const { error } = await resolveSchema(stategyEmailOTPVerificationSchema, {
    email,
    otp,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  const otpDoc = await Otp.findOne({ email });

  if (!otpDoc) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "OTP not found!",
            message:
              "OTP not found for this email, click on Resend Code to generate a new one.",
          },
        }
      )
    );
  }

  if (otpDoc?.otp !== otp) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Incorrect OTP!",
            message: "Entered OTP is not correct",
          },
        }
      )
    );
  }

  user.email = email;
  await user.save();

  return res.status(200).json(new ApiResponse(200, {}));
});

export {
  localLogin,
  singupOTPGeneration,
  singupOTPVerification,
  logoutUser,
  strategyCallback,
  stategyEmailOTPGeneration,
  stategyEmailOTPVerification,
};
