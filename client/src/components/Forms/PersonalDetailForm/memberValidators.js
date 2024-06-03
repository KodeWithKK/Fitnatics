import * as yup from "yup";
import { schemaValidator } from "@utils/schemaValidator";
import { convertToDate, calculateAge } from "@utils/dateUtils";

const checkName = async function (value) {
  const schema = yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "Enter a valid name");

  return await schemaValidator(schema, value);
};

const checkPhoneNo = async function (value) {
  const schema = yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/, "A valid 10 digit number is required");

  return await schemaValidator(schema, value);
};

const checkDOB = async function (value) {
  const schema = yup
    .string()
    .required("DOB is Required")
    .test("isValidDOB", "Enter a valid DOB (DD/MM/YYYY)", (val) => {
      const date = convertToDate(val);
      if (!date) return false;

      const age = calculateAge(date);
      if (age <= 0 || age >= 150) return false;
      return true;
    })
    .test("hasMinAge", "You are too young for the Gym", (val) => {
      const date = convertToDate(val);
      if (!date) return false;

      const age = calculateAge(date);
      return age >= 12;
    })
    .test("hasMaxAge", "You are too old for the Gym", (val) => {
      const date = convertToDate(val);
      if (!date) return false;

      const age = calculateAge(date);
      return age <= 100;
    });

  return await schemaValidator(schema, value);
};

const checkHeight = async function (value) {
  const schema = yup
    .number()
    .min(120, "Enter a valid Height (in cm)")
    .max(280, "Enter a valid Height (in cm)")
    .required("Height is required");

  return await schemaValidator(schema, value);
};

const checkWeight = async function (value) {
  const schema = yup
    .number()
    .min(30, "Enter a valid Weight")
    .max(300, "Enter a valid Weight")
    .required("Weight is required");

  return await schemaValidator(schema, value);
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
