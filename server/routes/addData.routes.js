import { Router } from "express";
import { membershipPlanDataHandler } from "../controller/addData.controller.js";

const router = Router();

router.route("/membership-plans").post(membershipPlanDataHandler);

export default router;
