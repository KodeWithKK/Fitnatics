import { Router } from "express";
import { membershipPlan } from "../controller/addData.controller.js";

const router = Router();

router.route("/membership-plans").post(membershipPlan);

export default router;
