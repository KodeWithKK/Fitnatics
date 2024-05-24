import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { transporter } from "../config/mailer.js";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import crypto from "crypto";

const localLoginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "All Fields Required!",
            message: "Please provide both email and password",
          },
        }
      )
    );
  }

  const user = await User.findOne({ email });

  if (user && user.provider !== "local") {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            title: "User already exist!",
            message: `An account with this email already created with ${user.provider}`,
          },
        }
      )
    );
  }

  if (!password) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "All Fields Required!",
            message: "Please provide both email and password",
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

const generateOTPHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((record) => record == undefined)) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "All fields are Required!",
            message: "Please provide email and password to generate OTP!",
          },
        }
      )
    );
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
    subject: "Hello from Fitnatics",
    text: `Your OTP for user verification is ${otp.otp}.`,
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

const verifyOTPHandler = asyncHandler(async (req, res) => {
  const { email, password, otp } = req.body;

  if ([email, password].some((record) => record == undefined)) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Email and Password not found!",
            message: "Please provide email and password to verify OTP!",
          },
        }
      )
    );
  }

  if (!otp) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "OTP not Found!",
            message: "Kindly provide the OTP for verification",
          },
        }
      )
    );
  }

  if (otp.length !== 6) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "6 Digit OTP Required!",
            message: "A 6 digit OTP is required for verification",
          },
        }
      )
    );
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

const logoutHandler = (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully"));
};

const strategyJWTAuthCookieHandler = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = req?.user;

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
      .cookie("authStatus", "failed");
  }

  const options = {
    httpOnly: true, // cannot be accessed via client-side scripts
    secure: true, // will only be sent over HTTPS
  };

  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .clearCookie("connect.sid")
    .redirect("http://localhost:5173");
});

export {
  localLoginHandler,
  generateOTPHandler,
  verifyOTPHandler,
  logoutHandler,
  strategyJWTAuthCookieHandler,
};
