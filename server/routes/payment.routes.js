import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  createOrderHandler,
  verifyPaymentHandler,
  viewAllOrdersHandler,
  viewAllPaymentsHandler,
} from "../controller/payment.controller.js";

const router = Router();

router.route("/create-order").post(verifyJWT, createOrderHandler);
router.route("/verify-payment").post(verifyJWT, verifyPaymentHandler);

// DEVELOPMENT ROUTES
if (process.env.NODE_ENV === "dev") {
  router.route("/view-all-orders").get(viewAllOrdersHandler);
  router.route("/view-all-payments").get(viewAllPaymentsHandler);
}

export default router;
