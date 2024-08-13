import * as yup from "yup";
import dayjs from "dayjs";
import { useMemo } from "react";
import apiClient from "@api/apiClient";
import debounce from "lodash.debounce";

function useValidator({
  onChangeFields,
  verifiedFields,
  isSubmitBtnTriggered,
}) {
  const personalDetailSchema = useMemo(() => {
    return yup.object({
      avatar: yup
        .mixed()
        .test(
          "AvatarImageNotFound",
          "Profile Picture is Required",
          (val) => !!val,
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
          },
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
            true,
          );
          return age >= 12;
        })
        .test("IsTooOld", "You are too old for the Gym", (dateString) => {
          const isDateValid = dayjs(dateString, "DD/MM/YYYY", true).isValid();
          if (isDateValid === false) return false;
          const age = dayjs().diff(
            dayjs(dateString, "DD/MM/YYYY"),
            "year",
            true,
          );
          return age <= 100;
        })
        .required("DOB is required"),

      gender: yup
        .string()
        .required("Gender is required")
        .oneOf(["male", "female"], "Gender is required"),

      address: yup
        .string()
        .required("Address is required")
        .matches(/^[a-zA-Z0-9/, ]*$/, "Address contains invalid characters"),
    });
  }, [onChangeFields, verifiedFields, isSubmitBtnTriggered]);

  return { personalDetailSchema };
}

async function checkEmailAvailability(email) {
  try {
    const data = await apiClient.get(
      import.meta.env.VITE_BACKEND_API_BASE + "/user/check-email-availability",
      { email },
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

export default useValidator;
