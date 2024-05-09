import { Router } from "express";
import { upload } from "./../middleware/multer.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  gettingStarted,
  loginHandler,
  generateAccountVerificationOtpHandler,
  verifyAccountVerificationOtpHandler,
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

router.route("/getting-started").post(uploadMiddleware, gettingStarted);
router.route("/login").post(loginHandler);
router.route("/generate-otp").post(generateAccountVerificationOtpHandler);
router.route("/verify-otp").post(verifyAccountVerificationOtpHandler);

export default router;
