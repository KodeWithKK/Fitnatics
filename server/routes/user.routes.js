import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  getUserDataHandler,
  checkEmailAvailability,
} from "../controller/user.controller.js";

const router = Router();

router.route("/get-user-data").get(verifyJWT, getUserDataHandler);
router
  .route("/check-email-availability")
  .get(verifyJWT, checkEmailAvailability);

export default router;
