import * as yup from "yup";
import { schemaValidator } from "@utils/schemaValidator";

const checkEmail = async function (value) {
  const schema = yup
    .string()
    .email("Enter a valid email")
    .required("Email is Required!");

  return await schemaValidator(schema, value);
};

const checkPassword = async function (value) {
  const schema = yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is Required");

  return await schemaValidator(schema, value);
};

const checkOTP = async function (value) {
  const schema = yup
    .string()
    .matches(/^[0-9]{6}$/, "A 6 digit OTP is required");

  return await schemaValidator(schema, value);
};

const isLoginDataValid = async function (formData) {
  const isEmailValid = (await checkEmail(formData?.email)).isValid;
  const isPasswordValid = (await checkPassword(formData?.password)).isValid;

  return isEmailValid && isPasswordValid;
};

export { checkEmail, checkPassword, checkOTP, isLoginDataValid };
