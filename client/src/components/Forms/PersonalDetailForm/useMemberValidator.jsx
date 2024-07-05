import * as yup from "yup";
import dayjs from "dayjs";
import { useMemo } from "react";
import apiClient from "@api/apiClient";
import debounce from "lodash.debounce";

async function checkEmailAvailability(email) {
  try {
    const data = await apiClient.get(
      import.meta.env.VITE_BACKEND_API_BASE + "/user/check-email-availability",
      { email }
    );
    return data?.isEmailAvailable;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const debouncedCheckEmailAvailability = debounce((email, resolve, reject) => {
  checkEmailAvailability(email).then(resolve).catch(reject);
}, 300);

function useMemberValidator({
  onChangeFields,
  verifiedFields,
  isSubmitBtnTriggered,
}) {
  const memberPersonalDetailSchema = useMemo(() => {
    return yup.object({
      avatar: yup
        .mixed()
        .test(
          "AvatarImageNotFound",
          "Profile Picture is Required",
          (val) => !!val
        )
        .required("Profile Picture is Required"),

      name: yup
        .string()
        .matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "Enter a valid name")
        .required("A valid name is required"),

      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is Required")
        .test(
          "EmailNotAvailable",
          "This email is already linked to an account",
          async (value) => {
            if (
              !verifiedFields.includes("email") &&
              (onChangeFields.includes("email") || isSubmitBtnTriggered)
            ) {
              const emailSchema = yup.string().email().required();
              const isEmailValid = await emailSchema.isValid(value);

              if (isEmailValid) {
                return new Promise((resolve, reject) => {
                  debouncedCheckEmailAvailability(value, resolve, reject);
                });
              }
            }
            return true;
          }
        ),

      phoneno: yup
        .string()
        .matches(/^\d{10}$/, "A valid 10 digit number is required")
        .required("Phone number is Required"),

      dob: yup
        .string()
        .test("IsValidDOB", "Enter a valid DOB (DD/MM/YYYY)", (dateString) => {
          const isValidDob = dayjs(dateString, "DD/MM/YYYY", true).isValid();
          const isPrevDate = dayjs(dateString, "DD/MM/YYYY").isBefore(dayjs());
          return isValidDob && isPrevDate;
        })
        .test("IsTooYoung", "You are too young for the Gym", (dateString) => {
          const isDateValid = dayjs(dateString, "DD/MM/YYYY", true).isValid();
          if (isDateValid === false) return false;
          const age = dayjs().diff(
            dayjs(dateString, "DD/MM/YYYY"),
            "year",
            true
          );
          return age >= 12;
        })
        .test("IsTooOld", "You are too old for the Gym", (dateString) => {
          const isDateValid = dayjs(dateString, "DD/MM/YYYY", true).isValid();
          if (isDateValid === false) return false;
          const age = dayjs().diff(
            dayjs(dateString, "DD/MM/YYYY"),
            "year",
            true
          );
          return age <= 100;
        })
        .required("DOB is Required"),

      gender: yup.string().oneOf(["male", "female"]).required(),

      height: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .min(120, "Enter a valid Height (in cm)")
        .max(280, "Enter a valid Height (in cm)")
        .required("Height is required"),

      weight: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .min(30, "Enter a valid Weight")
        .max(300, "Enter a valid Weight")
        .required("Weight is required"),

      workoutExperience: yup
        .string()
        .oneOf(["beginner", "intermediate", "advanced"])
        .required(),
    });
  }, [onChangeFields, verifiedFields, isSubmitBtnTriggered]);

  return { memberPersonalDetailSchema };
}

export default useMemberValidator;
