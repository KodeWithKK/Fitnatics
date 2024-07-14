import * as yup from "yup";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { Cashfree } from "cashfree-pg";
import { Payment } from "../models/payment.model.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const verifyPaymentSchema = yup.object({
  orderId: yup
    .string()
    .typeError({
      message: "Order Id must be a string",
    })
    .required({
      message: "Order Id is required to confirm the payment",
    }),
});

export const verifyPayment = asyncHandler(async (req, res, next) => {
  const { orderId } = req.body;

  const { error } = await resolveSchema(verifyPaymentSchema, { orderId });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  let customerId,
    productId,
    productType,
    productPrice,
    productBoughtAt,
    isInvalidOrderId = false,
    fetchOrderErrorMssg = null;

  await Cashfree.PGFetchOrder("2023-08-01", orderId)
    .then(async (response) => {
      const orderData = response.data;
      customerId = orderData.customer_details.customer_id;
      productId = orderData.order_tags.productId;
      productPrice = orderData.order_amount;
      productType = orderData.order_tags.productType;
      productBoughtAt = orderData.order_tags.createdAt;
    })
    .catch((error) => {
      isInvalidOrderId = true;
      fetchOrderErrorMssg = error?.response?.data?.message;
    });

  if (isInvalidOrderId) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: { message: fetchOrderErrorMssg ?? "Invalid Order ID" },
        }
      )
    );
  }

  if (customerId != req.user._id) {
    return res.status(401).json(
      401,
      {},
      {
        error: { message: "Unauthorized payment verification request" },
      }
    );
  }

  let paymentStatus,
    fetchPaymentErrorMssg,
    gotFetchPaymentError = false;

  await Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
    .then((response) => {
      const paymentData = response?.data?.[0];
      paymentStatus = paymentData.payment_status;
    })
    .catch((error) => {
      gotFetchPaymentError = true;
      fetchPaymentErrorMssg = error?.response?.data?.message;
    });

  if (gotFetchPaymentError) {
    return res.status(401).json(
      new ApiResponse(
        401,
        {},
        {
          error: {
            message:
              fetchPaymentErrorMssg ??
              "Something went wrong while verifying payments",
          },
        }
      )
    );
  }

  await Payment.create({
    userId: req.user._id,
    orderId,
    productId,
    productType,
    buyPrice: productPrice,
    date: productBoughtAt,
  });

  if (paymentStatus === "SUCCESS") {
    if (productType === "Membership Plan") {
      await MembershipPlan.findByIdAndUpdate(productId, {
        $inc: {
          totalPayments: 1,
        },
      });
    }

    req.productId = productId;
    req.productType = productType;
    req.productBoughtAt = productBoughtAt;
    next();
  } else {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Payment Required!",
            message: "Complete the payment to proceed",
          },
        }
      )
    );
  }
});
