import { Router } from "express";

import { testSchema, testDayjs } from "../controller/test.controller.js";

const router = Router();

router.route("/schema").post(testSchema);
router.route("/dayjs").post(testDayjs);

export default router;
