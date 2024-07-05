import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyPayment } from "../middleware/verifyPayment.middleware.js";
import { setupAccountImgUpload } from "../middleware/fileUpload.middleware.js";

import {
  fetchUserData,
  checkEmailAvailability,
  setupAccount,
  getMemberTodaysDietEntry,
  getMemberExerciseEntry,
} from "../controller/user.controller.js";

const router = Router();

/* GET ROUTES */
router
  .route("/check-email-availability")
  .get(verifyJWT, checkEmailAvailability);
router.route("/get-user-data").get(verifyJWT, fetchUserData);
router.route("/get-todays-diet-entry").get(verifyJWT, getMemberTodaysDietEntry);
router.route("/get-exercise-entry").get(verifyJWT, getMemberExerciseEntry);

/* POST ROUTES */
router
  .route("/setup-account")
  .post(verifyJWT, setupAccountImgUpload, verifyPayment, setupAccount);

export default router;
