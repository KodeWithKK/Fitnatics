import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import { getMembershipPlansDataHandler } from "../controller/getData.contoller.js";

const router = Router();

router.route("/membership-plans").get(verifyJWT, getMembershipPlansDataHandler);

export default router;
