import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  createOrder,
  verifyPayment,
  viewAllOrders,
  viewOrder,
  viewAllPayments,
} from "../controller/payment.controller.js";

const router = Router();

router.route("/create-order").post(verifyJWT, createOrder);
router.route("/verify-payment").post(verifyJWT, verifyPayment);

// DEVELOPMENT ROUTES
if (process.env.NODE_ENV === "dev") {
  router.route("/view-order").get(viewOrder);
  router.route("/view-all-orders").get(viewAllOrders);
  router.route("/view-all-payments").get(viewAllPayments);
}

export default router;
