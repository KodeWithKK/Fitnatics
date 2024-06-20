import * as yup from "yup";
import mongoose from "mongoose";

const createOrderSchema = yup.object({
  productId: yup
    .string()
    .typeError({
      title: "Invalid data type Provided!",
      message: "Product Id must be a string",
    })
    .required({
      title: "Product Id Required!",
      message: "Product Id is required to create an order",
    })
    .test(
      "IsValidObjectId",
      {
        title: "Invalid Product ID!",
        message: "A valid product ID is required to create an order",
      },
      (value) => mongoose.Types.ObjectId.isValid(value)
    ),
  productType: yup
    .string()
    .typeError({
      title: "Invalid data type Provided!",
      message: "Product type must be a string",
    })
    .oneOf(["Membership Plan"], {
      title: "Incorrect Product Type!",
      message: "Please provide a correct product type",
    })
    .required({
      title: "Product Type Required!",
      message: "Product Type is required to create an order",
    }),
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

export { createOrderSchema, verifyPaymentSchema };
