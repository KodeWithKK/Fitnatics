import * as yup from "yup";

const checkEmail = async function (value) {
  let errorMessage = null;
  const schema = yup.string().email().required();
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "Enter a valid email";
  }

  return { isValid, errorMessage };
};

const checkPassword = async function (value) {
  let errorMessage = null;
  const schema = yup.string().min(8).required();
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "Password must contain at least 8 characters";
  }

  return { isValid, errorMessage };
};

const checkOTP = async function (value) {
  let errorMessage = null;
  const schema = yup.string().matches(/^[0-9]{6}$/);
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "A 6 digit OTP is required";
  }

  return { isValid, errorMessage };
};

const isLoginDataValid = async function (formData) {
  const isEmailValid = (await checkEmail(formData?.email)).isValid;
  const isPasswordValid = (await checkPassword(formData?.password)).isValid;

  return isEmailValid && isPasswordValid;
};

export { checkEmail, checkPassword, checkOTP, isLoginDataValid };
