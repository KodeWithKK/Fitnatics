import * as yup from "yup";
import ApiClient from "../../utils/ApiClient.js";
import { convertToDate, calculateAge } from "../../utils/dateUtils.js";

async function checkEmailAvailability(email) {
  try {
    const data = await ApiClient.get(
      process.env.SERVER_URL + "/api/v1/user/check-email-availability",
      { email }
    );
    return data?.isEmailAvailable;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const checkEmailAvailabilitySchema = yup.object({
  email: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Email must be a string",
    })
    .email({
      title: "Invalid Email!",
      message: "Enter a valid email to check its availability",
    })
    .required({
      title: "Email not Found!",
      message: "Email is required to to check its availability",
    }),
});

const memberDataSchema = yup.object({
  avatar: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Profile picture must be a string",
    })
    .url({
      title: "Invalid URL!",
      message: "A valid profile picture is required to setup account",
    })
    .required({
      title: "Profile Picture field not Found!",
      message: "Profile picture is required to setup account",
    }),
  name: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Name must be a string",
    })
    .matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, {
      title: "Invalid Name!",
      message: "A valid name is required to setup account",
    })
    .required({
      title: "Name field not Found!",
      message: "Name is required to setup account",
    }),
  email: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Email must be a string",
    })
    .email({
      title: "Invalid Email!",
      message: "Enter a valid email to setup account",
    })
    .required({
      title: "Email field not Found!",
      message: "Email is required to setup account",
    })
    .test(
      "EmailNotAvailable",
      {
        title: "Email already taken!",
        message: "This email is already linked to an account",
      },
      async (value) => await checkEmailAvailability(value)
    ),
  phoneno: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Phone no must be a string",
    })
    .matches(/^[0-9]{10}$/, {
      title: "Invalid Phone no!",
      message: "A valid 10 digit phone number is required to setup account",
    })
    .required({
      title: "Phone Number field not Found!",
      message: "Phone number is required to setup account",
    }),
  dob: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "DOB must be a string",
    })
    .test(
      "IsValidDOB",
      {
        title: "Invalid DOB!",
        message: "Enter a valid DOB (DD/MM/YYYY)",
      },
      (val) => {
        const date = convertToDate(val);
        if (!date) return false;

        const age = calculateAge(date);
        if (age <= 0 || age >= 150) return false;
        return true;
      }
    )
    .test(
      "IsTooYoung",
      { title: "Too Young!", message: "You are too young for the Gym" },
      (val) => {
        const date = convertToDate(val);
        if (!date) return false;

        const age = calculateAge(date);
        return age >= 12;
      }
    )
    .test(
      "IsTooOld",
      { title: "Too Old!", message: "You are too old for the Gym" },
      (val) => {
        const date = convertToDate(val);
        if (!date) return false;

        const age = calculateAge(date);
        return age <= 100;
      }
    )
    .required({
      title: "DOB field not Found!",
      message: "DOB is required to setup account",
    }),
  gender: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "DOB must be a string",
    })
    .oneOf(["male", "female"], {
      title: "Incorrect Gender!",
      message: "A valid gender is required to setup acoount",
    })
    .required({
      title: "Gender field not Found!",
      message: "Gender is required to setup account",
    }),

  height: yup
    .number()
    .typeError({
      title: "Invalid data type!",
      message: "height must be a number",
    })
    .min(120, {
      title: "Invalid Height!",
      message: "Enter a valid height (in cm)",
    })
    .max(280, {
      title: "Invalid Height!",
      message: "Enter a valid height (in cm)",
    })
    .required({
      title: "Height field not Found!",
      message: "Height is required to setup account",
    }),

  weight: yup
    .number()
    .typeError({
      title: "Invalid data type!",
      message: "wight must be a number",
    })
    .min(30, {
      title: "Invalid Weight!",
      message: "Enter a valid weight (in Kg)",
    })
    .max(300, {
      title: "Invalid Weight!",
      message: "Enter a valid weight (in Kg)",
    })
    .required({
      title: "Weight field not Found!",
      message: "Weight is required to setup account",
    }),

  workoutExperience: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Workout Experience must be a number",
    })
    .oneOf(["beginner", "intermediate", "advanced"], {
      title: "Incorrect Workout Experience!",
      message: "A valid workout experience level is required to setup acoount",
    })
    .required({
      title: "Workout Experience field not Found!",
      message: "Workout experience is required to setup account",
    }),
  gymOutlet: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Gym Outlet must be a string",
    })
    .oneOf(["male", "female"], {
      title: "Incorrect Gym Outlet!",
      message: "A valid gym outlet is required to setup acoount",
    })
    .required({
      title: "Gym Outlet field not Found!",
      message: "Gym Outlet is required to setup account",
    }),
});

export { checkEmailAvailabilitySchema, memberDataSchema };
