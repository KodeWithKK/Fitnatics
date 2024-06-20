import passport from "passport";
import { Router } from "express";
import { verifyJWT } from "./../middleware/auth.middleware.js";

import {
  localLogin,
  singupOTPGeneration,
  singupOTPVerification,
  logoutUser,
  strategyCallback,
  stategyEmailOTPGeneration,
  stategyEmailOTPVerification,
} from "./../controller/auth.controller.js";

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
