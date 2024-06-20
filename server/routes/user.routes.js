import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyPayment } from "../middleware/verifyPayment.middleware.js";
import { upload } from "./../middleware/multer.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

import {
  fetchUserData,
  checkEmailAvailability,
  setupAccount,
} from "../controller/user.controller.js";

const router = Router();

router
  .route("/check-email-availability")
  .get(verifyJWT, checkEmailAvailability);
router.route("/get-user-data").get(verifyJWT, fetchUserData);

router
  .route("/setup-account")
  .post(verifyJWT, uploadMiddleware, verifyPayment, setupAccount);

export default router;
