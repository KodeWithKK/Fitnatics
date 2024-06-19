import passport from "passport";
import { Router } from "express";
import { upload } from "./../middleware/multer.middleware.js";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  localLogin,
  singupOTPGeneration,
  singupOTPVerification,
  logoutUser,
  strategyCallback,
  stategyEmailOTPGeneration,
  stategyEmailOTPVerification,
} from "./../controller/auth.controller.js";

function uploadMiddleware(req, res, next) {
  try {
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
      {
        name: "gymLogo",
        maxCount: 1,
      },
    ])(req, res, function (err) {
      if (err) {
        const errObj = {};

        if (err.message === "Invalid Image Type") {
          errObj.title = err.message;
          errObj.message = "Please upload a valid image";
        } else {
          errObj.title = err.message;
          errObj.message = "Somethin went wrong while uploading the image";
        }

        res.status(400).json(new ApiResponse(400, {}, errObj));
      } else next();
    });
  } catch (error) {
    console.log("errorrororororororoor");
  }
}

const router = Router();

// Local Auth Routes
router.route("/login-local").post(localLogin);
router.route("/generate-otp").post(singupOTPGeneration);
router.route("/verify-otp").post(singupOTPVerification);

// Google Auth Routes
router
  .route("/login-google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/login-google/callback")
  .get(passport.authenticate("google", { session: false }), strategyCallback);

// Facebook Auth Routes
router.route("/login-facebook").get(passport.authenticate("facebook"));

router
  .route("/login-facebook/callback")
  .get(passport.authenticate("facebook", { session: false }), strategyCallback);

// Twitter Auth Routes
router.route("/login-twitter").get(passport.authenticate("twitter"));

router
  .route("/login-twitter/callback")
  .get(passport.authenticate("twitter", { session: false }), strategyCallback);

// Secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/strategy-verify-email")
  .post(verifyJWT, stategyEmailOTPGeneration);
router
  .route("/strategy-verify-email")
  .get(verifyJWT, stategyEmailOTPVerification);

export default router;
