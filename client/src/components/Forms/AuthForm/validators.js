import * as yup from "yup";

const loginSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is Required"),
    password: yup
      .string()
      .min(8, "Password must contain at least 8 characters")
      .required("Password is Required"),
  })
  .required();

const signupSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is Required"),
    password: yup
      .string()
      .min(8, "Password must contain at least 8 characters")
      .required("Password is Required"),
    otp: yup
      .string()
      .matches(/^[0-9]{6}$/, "A 6 digit OTP is required")
      .required("OTP is Required for Authentication"),
  })
  .required();

export { loginSchema, signupSchema };
