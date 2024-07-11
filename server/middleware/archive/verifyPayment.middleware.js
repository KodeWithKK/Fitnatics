import * as yup from "yup";
import crypto from "crypto";
import Razorpay from "razorpay";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { MembershipPlan } from "../models/membershipPlans.model.js";
import { Payment } from "../models/payment.model.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const verifyPaymentSchema = yup.object({
  razorpay_order_id: yup
    .string()
    .typeError({
      title: "Invalid data type Provided!",
      message: "Order Id must be a string",
    })
    .required({
      title: "Order Id Required!",
      message: "Order Id is required to confirm the payment",
    }),
  razorpay_payment_id: yup
    .string()
    .typeError({
      title: "Invalid data type Provided!",
      message: "Payment Id must be a string",
    })
    .required({
      title: "Payment Id Required!",
      message: "Payment Id is required to confirm the payment",
    }),
  razorpay_signature: yup
    .string()
    .typeError({
      title: "Invalid data type Provided!",
      message: "Product Id must be a string",
    })
    .required({
      title: "Payment Id Required!",
      message: "Payment Id is required to confirm the payment",
    }),
});

export const verifyPayment = asyncHandler(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const { error } = await resolveSchema(verifyPaymentSchema, {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  const isAuthentic = expectedSign === razorpay_signature;

  if (!isAuthentic) {
    return res.status(
      400,
      {},
      {
        error: {
          title: "Invalid Credentials!",
          message: "Kindly provide correct credentials to verify the payment",
        },
      }
    );
  }

  razorpayInstance.orders
    .fetch(razorpay_order_id)
    .then(async (orderData) => {
      const productId = orderData.notes?.productId;
      const productType = orderData.notes?.productType;

      const payment = new Payment({
        userId: req.user._id,
        productId,
        productType,
        buyPrice: orderData.amount / 100,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      if (productType === "Membership Plan") {
        const res = await MembershipPlan.findByIdAndUpdate(productId, {
          $inc: { totalPayments: 1 },
        });

        if (!res) {
          res.status(
            400,
            {},
            {
              error: {
                title: "Something went wrong!",
                message: "Something went wrong while verifying payment",
              },
            }
          );
        } else {
          await payment.save();
          req.paymentId = payment._id;
          req.productId = productId;
          next();
        }
      }
    })
    .catch(() => {
      res.status(
        400,
        {},
        {
          error: {
            title: "Invalid Order ID Provided!",
            message: "Kindly provide correct order ID to verify payment",
          },
        }
      );
    });
});
