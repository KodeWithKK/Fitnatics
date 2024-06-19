import { Router } from "express";

import { testSchema } from "../controller/test.controller.js";

const router = Router();

router.route("/schema").post(testSchema);

export default router;
