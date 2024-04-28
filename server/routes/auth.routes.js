import { Router } from "express";
import { upload } from "./../middleware/multer.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  gettingStarted,
  loginHandler,
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
      if (err)
        res.status(400).json(
          new ApiResponse(
            400,
            {},
            {
              title: err.message,
            }
          )
        );
      else next();
    });
  } catch (error) {
    console.log("errorrororororororoor");
  }
}

const router = Router();

router.route("/getting-started").post(uploadMiddleware, gettingStarted);
router.route("/login").post(loginHandler);

export default router;
