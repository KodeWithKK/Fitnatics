import * as yup from "yup";

const localLoginSchema = yup.object({
  email: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Email must be a string",
    })
    .email({
      title: "Invalid Email!",
      message: "Enter a valid email to login via email and password",
    })
    .required({
      title: "Email not Found!",
      message: "Email is required to login via email and password",
    }),
  password: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "password must be a string",
    })
    .min(8, {
      title: "Password is too short!",
      message: "Password must contain atleast 8 characters",
    })
    .required({
      title: "Password not Found!",
      message: "Password is required to login via email and password",
    }),
});

const signupOTPGenerationSchema = yup.object({
  email: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Email must be a string",
    })
    .email({
      title: "Invalid Email!",
      message: "Enter a valid email to generate OTP",
    })
    .required({
      title: "Email not Found!",
      message: "Email is required to generate OTP",
    }),
  password: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "password must be a string",
    })
    .min(8, {
      title: "Password is too short!",
      message: "Password must contain atleast 8 characters",
    })
    .required({
      title: "Password not Found!",
      message: "Password is required to generate OTP",
    }),
});

const signupOTPVerificationSchema = yup.object({
  email: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Email must be a string",
    })
    .email({
      title: "Invalid Email!",
      message: "Enter a valid email for OTP verification",
    })
    .required({
      title: "Email not Found!",
      message: "Email is required for OTP verification",
    }),
  password: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "password must be a string",
    })
    .min(8, {
      title: "Password is too short!",
      message: "Password must contain atleast 8 characters",
    })
    .required({
      title: "Password not Found!",
      message: "Password is required for OTP verification",
    }),
  otp: yup
    .string()
    .matches(/^[0-9]{6}$/, {
      title: "6 Digit OTP Required!",
      message: "A 6 digit OTP is required for verification",
    })
    .required({
      title: "OTP not Found!",
      message: "A 6 digit OTP is required",
    }),
});

const stategyEmailOTPGenerationSchema = yup.object({
  email: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Email must be a string",
    })
    .email({
      title: "Invalid Email!",
      message: "Enter a valid email for OTP Generation",
    })
    .required({
      title: "Email not Found!",
      message: "Email is required for OTP Generation",
    }),
});

const stategyEmailOTPVerificationSchema = yup.object({
  email: yup
    .string()
    .typeError({
      title: "Invalid data type!",
      message: "Email must be a string",
    })
    .email({
      title: "Invalid Email!",
      message: "Enter a valid email for OTP Generation",
    })
    .required({
      title: "Email not Found!",
      message: "Email is required for OTP Generation",
    }),
  otp: yup
    .string()
    .matches(/^[0-9]{6}$/, {
      title: "6 Digit OTP Required!",
      message: "A 6 digit OTP is required for verification",
    })
    .required({
      title: "OTP not Found!",
      message: "A 6 digit OTP is required for verification",
    }),
});

export {
  localLoginSchema,
  signupOTPGenerationSchema,
  signupOTPVerificationSchema,
  stategyEmailOTPGenerationSchema,
  stategyEmailOTPVerificationSchema,
};
