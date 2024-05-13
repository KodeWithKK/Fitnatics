import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import { getUserDataHandler } from "../controller/user.controller.js";

const router = Router();

router.route("/get-user-data").get(verifyJWT, getUserDataHandler);

export default router;
