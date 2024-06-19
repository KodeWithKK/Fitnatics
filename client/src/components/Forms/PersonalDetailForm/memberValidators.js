import * as yup from "yup";
import { convertToDate, calculateAge } from "@utils/dateUtils";
import apiClient from "@api/apiClient";
import debounce from "lodash.debounce";

const fromStatus = { onChange: null, isSubmitting: false, verifiedFields: [] };

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

const memberPersonalDetailSchema = yup
  .object()
  .shape({
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
      .required("OTP is Required for Authentication"),

    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is Required")
      .test(
        "EmailNotAvailable",
        "This email is already linked to an account",
        async (value) => {
          // console.log(fromStatus);

          if (
            !fromStatus.verifiedFields.includes("email") &&
            (fromStatus.onChange === "email" || fromStatus.isSubmitting)
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
      .matches(/^[0-9]{10}$/, "A valid 10 digit number is required")
      .required("Phone number is Required"),

    dob: yup
      .string()
      .test("IsValidDOB", "Enter a valid DOB (DD/MM/YYYY)", (val) => {
        const date = convertToDate(val);
        if (!date) return false;

        const age = calculateAge(date);
        if (age <= 0 || age >= 150) return false;
        return true;
      })
      .test("IsTooYoung", "You are too young for the Gym", (val) => {
        const date = convertToDate(val);
        if (!date) return false;

        const age = calculateAge(date);
        return age >= 12;
      })
      .test("IsTooOld", "You are too old for the Gym", (val) => {
        const date = convertToDate(val);
        if (!date) return false;

        const age = calculateAge(date);
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
  })
  .required();

export { memberPersonalDetailSchema, fromStatus };
