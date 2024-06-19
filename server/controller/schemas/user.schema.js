import * as yup from "yup";

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

export { checkEmailAvailabilitySchema };
