import { MembershipPlan } from "../models/membershipPlans.model.js";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import Razorpay from "razorpay";
import crypto from "crypto";

import {
  createOrderSchema,
  verifyPaymentSchema,
} from "./schemas/payment.schema.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = asyncHandler(async (req, res) => {
  const { productId, productType } = req.body;

  console.log({ productId, productType });

  const { error } = await resolveSchema(createOrderSchema, {
    productId,
    productType,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  if (productType === "Membership Plan") {
    const product = await MembershipPlan.findByIdAndUpdate(
      productId,
      { $inc: { totalOrders: 1 } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json(
        new ApiResponse(
          404,
          {},
          {
            error: {
              title: "Product not found!",
              message: "Kindly provide valid product details",
            },
          }
        )
      );
    }

    const productName = `Membership plan (${product.duration} ${
      product.duration === 1 ? "Month" : "Months"
    })`;

    const amount = product.currPrice * 100;
    const currency = product.currency;

    const receipt = `${product.type}-${product.duration
      .toString()
      .padStart(2, "0")}-#${product.totalOrders}`;

    const notes = {
      productName,
      orderNumber: product.totalOrders,
      productId,
      productType,
      time: new Date().toLocaleString(),
    };

    razorpayInstance.orders.create(
      { amount, currency, receipt, notes },
      (err, order) => {
        if (!err) {
          res.status(200).json(
            new ApiResponse(200, {
              productName,
              orderId: order.id,
              amount: order.amount,
              currency: order.currency,
            })
          );
        } else {
          res.status(err?.statusCode ?? 400).json(
            new ApiResponse(
              400,
              {},
              {
                error: {
                  title: "Something went wrong with payments!",
                  message:
                    process.env.NODE_ENV === "dev"
                      ? `Razorpay: ${err?.error?.description}`
                      : "We are working on it kindly come back later!",
                },
              }
            )
          );
        }
      }
    );
  }
});

const verifyPayment = asyncHandler(async (req, res) => {
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
          res.status(200).json(new ApiResponse());
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

const checkPayment = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const paymentUser = await Payment.find({ userId }).sort({ updatedAt: -1 });

  if (paymentUser?.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { isPaymentCompleted: false }));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { isPaymentCompleted: true }));
});

const viewAllOrders = asyncHandler(async (req, res) => {
  razorpayInstance.orders
    .all()
    .then((orders) => {
      res.status(200).json(new ApiResponse(200, { orders }));
    })
    .catch((error) => {
      res.status(400).json(new ApiResponse(400, {}, { error }));
    });
});

const viewOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  razorpayInstance.orders
    .fetch(orderId)
    .then((orderData) => {
      res.status(200).json(new ApiResponse(200, { orderData }));
    })
    .catch((error) => {
      res.status(400).json(new ApiResponse(400, {}, { error }));
    });
});

const viewAllPayments = asyncHandler(async (req, res) => {
  razorpayInstance.payments
    .all()
    .then((orders) => {
      res.status(200).json(new ApiResponse(200, { orders }));
    })
    .catch((error) => {
      res.status(400).json(new ApiResponse(400, {}, { error }));
    });
});

export {
  createOrder,
  verifyPayment,
  checkPayment,
  viewAllOrders,
  viewOrder,
  viewAllPayments,
};
