import { Router } from "express";
import {
  membershipPlan,
  dietChart,
  workoutChart,
} from "../controller/addData.controller.js";

const router = Router();

router.route("/membership-plans").post(membershipPlan);
router.route("/diet-chart").post(dietChart);
router.route("/workout-chart").post(workoutChart);

export default router;
