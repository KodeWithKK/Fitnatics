import * as yup from "yup";

const checkName = async function (value) {
  let errorMessage = null;
  const schema = yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/);
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "Enter a valid name";
  }
  return { isValid, errorMessage };
};

const checkPhoneNo = async function (value) {
  let errorMessage = null;
  const schema = yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/);
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "A valid 10 digit number is required";
  }
  return { isValid, errorMessage };
};

const checkDOB = async function (value) {
  let errorMessage = null;
  const schema = yup
    .string()
    .required()
    .matches(
      /^(0[1-9]|[12][0-9]|3[0-1])\/([1-9]|0[1-9]|1[12])\/(1[0-9]{3}|20([01][0-9]|2[0-4]))$/
    );
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "Enter a valid DOB (DD/MM/YYYY)";
  }
  return { isValid, errorMessage };
};

const checkHeight = async function (value) {
  let errorMessage = null;
  const schema = yup.number().min(120).max(280).required();
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "Enter a valid Height";
  }
  return { isValid, errorMessage };
};

const checkWeight = async function (value) {
  let errorMessage = null;
  const schema = yup.number().min(30).max(300).required();
  const isValid = await schema.isValid(value);

  if (!isValid) {
    errorMessage = "Enter a valid Weight";
  }
  return { isValid, errorMessage };
};

const isFormDataValid = async function (formData) {
  const isNameValid = (await checkName(formData?.name)).isValid;
  const isPhoneNoValid = (await checkPhoneNo(formData?.phoneno)).isValid;
  const isDobValid = (await checkDOB(formData?.dob)).isValid;
  const isHeightValid = (await checkHeight(formData?.height)).isValid;
  const isWeightValid = (await checkWeight(formData?.weight)).isValid;
  const isGenderValid = formData?.gender;
  const isWorkoutExperienceValid = formData?.workoutExperience;

  return (
    isNameValid &&
    isPhoneNoValid &&
    isDobValid &&
    isHeightValid &&
    isWeightValid &&
    isGenderValid &&
    isWorkoutExperienceValid
  );
};

export {
  checkName,
  checkPhoneNo,
  checkDOB,
  checkHeight,
  checkWeight,
  isFormDataValid,
};
