import { MembershipPlan } from "../models/membershipPlans.model.js";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrderHandler = asyncHandler(async (req, res) => {
  const { productId, orderType } = req.body;

  if (!productId || !orderType) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Product ID and Order type required!",
            message: "Product ID and order type is required to create an order",
          },
        }
      )
    );
  }

  if (!["MEMBERSHIP-PLAN"].includes(orderType)) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "Invalid Order type!",
            message: "Give a valid order type to create an order",
          },
        }
      )
    );
  }

  if (orderType === "MEMBERSHIP-PLAN") {
    const product = await MembershipPlan.findOneAndUpdate(
      { planId: productId },
      { $inc: { totalOrders: 1 } },
      { new: true }
    );

    if (!product) {
      return res.status(400).json(
        new ApiResponse(
          400,
          {},
          {
            error: {
              title: "Invalid Product ID!",
              message: "Given product id doesn't exist",
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
          res.status(400).json(
            new ApiResponse(
              400,
              {},
              {
                error: {
                  title: err?.message,
                  message: err,
                },
              }
            )
          );
        }
      }
    );
  }
});

const verifyPaymentHandler = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (
    [razorpay_order_id, razorpay_payment_id, razorpay_signature].some(
      (field) => field === undefined
    )
  ) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: "All Fields Required!",
            message: "All fields are required to verify the payment",
          },
        }
      )
    );
  }

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  const isAuthentic = expectedSign === razorpay_signature;

  if (isAuthentic) {
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await payment.save();
    return res.status(200).json(new ApiResponse());
  }

  return res.status(
    500,
    {},
    {
      error: {
        title: "Internal Server Error",
        message: "Something went wrong while verifying the payments",
      },
    }
  );
});

const viewAllOrdersHandler = asyncHandler(async (req, res) => {
  razorpayInstance.orders
    .all()
    .then((orders) => {
      res.status(200).json(new ApiResponse(200, { orders }));
    })
    .catch((err) => {
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: err?.message,
            message: err,
          },
        }
      );
    });
});

const viewAllPaymentsHandler = asyncHandler(async (req, res) => {
  razorpayInstance.payments
    .all()
    .then((orders) => {
      res.status(200).json(new ApiResponse(200, { orders }));
    })
    .catch((err) => {
      new ApiResponse(
        400,
        {},
        {
          error: {
            title: err?.message,
            message: err,
          },
        }
      );
    });
});

export {
  createOrderHandler,
  verifyPaymentHandler,
  viewAllOrdersHandler,
  viewAllPaymentsHandler,
};
