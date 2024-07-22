import { MembershipPlan } from "../models/membershipPlans.model.js";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolveSchema } from "../utils/resolveSchema.js";
import { getShortId } from "../utils/getShortId.js";
import { Cashfree } from "cashfree-pg";

import { createOrderSchema } from "./schemas/payment.schema.js";

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const createOrder = asyncHandler(async (req, res) => {
  const { productId, productType } = req.body;

  const { error } = await resolveSchema(createOrderSchema, {
    productId,
    productType,
  });

  if (error) {
    return res.status(400).json(new ApiResponse(400, {}, { error }));
  }

  let product = null;

  if (productType === "Membership Plan") {
    product = await MembershipPlan.findByIdAndUpdate(
      productId,
      { $inc: { totalOrders: 1 } },
      { new: true }
    );
  }

  if (!product) {
    return res.status(404).json(
      new ApiResponse(
        404,
        {},
        {
          error: { message: "Product not found!" },
        }
      )
    );
  }

  const productName = `Membership plan (${product.duration} ${
    product.duration === 1 ? "Month" : "Months"
  })`;

  let request = {
    order_amount: product.currPrice,
    order_currency: "INR",
    order_id: getShortId(16),
    customer_details: {
      customer_id: req.user._id,
      customer_phone: "8474090589",
    },
    order_meta: {
      payment_methods: "cc,dc,upi,app,nb",
    },
    order_tags: {
      productName,
      productId,
      productType,
      createdAt: new Date(),
    },
  };

  await Cashfree.PGCreateOrder("2023-08-01", request)
    .then((response) => {
      res.status(200).json(
        new ApiResponse(200, {
          paymentSessionId: response.data.payment_session_id,
          orderId: request.order_id,
        })
      );
    })
    .catch((err) => {
      // console.log({ err: err.response.data });

      res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            { error: { message: "Something went wrong while creating order!" } }
          )
        );
    });
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  await Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
    .then(async (response) => {
      const orderResponse = response.data;
      let orderStatus;

      if (
        orderResponse.filter(
          (transaction) => transaction.payment_status === "SUCCESS"
        ).length > 0
      ) {
        orderStatus = "SUCCESS";
      } else if (
        orderResponse.filter(
          (transaction) => transaction.payment_status === "PENDING"
        ).length > 0
      ) {
        orderStatus = "PENDING";
      } else {
        orderStatus = "FAILED";
      }

      if (orderStatus === "SUCCESS") {
        res.status(200).json(new ApiResponse());
      }

      if (orderStatus === "PENDING") {
        res.status(401).json(
          new ApiResponse(
            401,
            {},
            {
              error: {
                title: "Payment is Pending!",
                message: "Complete the payment to proceed",
              },
            }
          )
        );
      }

      if (orderStatus === "FAILED") {
        res.status(401).json(
          new ApiResponse(
            401,
            {},
            {
              error: {
                title: "Payment Failed!",
                message: "Payment is required to proceed",
              },
            }
          )
        );
      }
    })
    .catch((error) => {
      res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            { error: { message: error.response.data.message } }
          )
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
  // razorpayInstance.orders
  //   .all()
  //   .then((orders) => {
  //     res.status(200).json(new ApiResponse(200, { orders }));
  //   })
  //   .catch((error) => {
  //     res.status(400).json(new ApiResponse(400, {}, { error }));
  //   });
});

const viewOrder = asyncHandler(async (req, res) => {
  //   const { orderId } = req.body;
  //   razorpayInstance.orders
  //     .fetch(orderId)
  //     .then((orderData) => {
  //       res.status(200).json(new ApiResponse(200, { orderData }));
  //     })
  //     .catch((error) => {
  //       res.status(400).json(new ApiResponse(400, {}, { error }));
  //     });
});

const viewAllPayments = asyncHandler(async (req, res) => {
  //   razorpayInstance.payments
  //     .all()
  //     .then((orders) => {
  //       res.status(200).json(new ApiResponse(200, { orders }));
  //     })
  //     .catch((error) => {
  //       res.status(400).json(new ApiResponse(400, {}, { error }));
  // });
});

export {
  createOrder,
  verifyPayment,
  checkPayment,
  viewAllOrders,
  viewOrder,
  viewAllPayments,
};
