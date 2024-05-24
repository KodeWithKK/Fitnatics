import * as yup from "yup";
import { useState, useCallback, useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { makePostRequest } from "@api/api";
import { useMutation } from "@tanstack/react-query";

function useAuthFormHooks() {
  const [displayType, setDisplayType] = useState("login");
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const { addToast } = useContext(GlobalContext);

  const handleInput = useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const { isPending: isOtpReqPending, mutate: generateOTP } = useMutation({
    mutationFn: async () => {
      const data = await makePostRequest(
        "http://localhost:8000/api/v1/auth/generate-otp",
        {
          email: formData?.email,
          password: formData?.password,
        }
      );
      return data;
    },
    onSuccess: () => {
      const nextOtpGeneratedAt = new Date();
      setOtpGeneratedAt(nextOtpGeneratedAt);
    },
    onError: (error) => {
      addToast("error", error?.title, error?.message);
    },
  });

  const resendOTPHandler = useCallback(() => {
    setOtpGeneratedAt(null);
    generateOTP();
    addToast("info", "OTP Resended!", "A new OTP is sent to your email");
  }, [generateOTP, addToast]);

  const { isPending: isLoginReqPending, mutate: loginSubmitHandler } =
    useMutation({
      mutationFn: async () => {
        const loginData = {
          email: formData?.email,
          password: formData?.password,
        };

        const isValid = await loginFormSchema.isValid(loginData);

        if (!isValid) {
          addToast(
            "error",
            "Invalid form data!",
            "Enter valid form data to continue with email"
          );
        } else {
          await makePostRequest(
            "http://localhost:8000/api/v1/auth/login-local",
            loginData
          );
        }
      },
      onSuccess: () => {
        window.location.href = "/";
      },
      onError: async (error) => {
        if (error?.title == "User doesn't exist!") {
          await generateOTP();
          setDisplayType("signup");
        } else {
          addToast("error", error.title, error.message);
        }
      },
    });

  const { isPending: isOTPVerifcationReqPending, mutate: signupSubmitHandler } =
    useMutation({
      mutationFn: async () => {
        const otp = formData.otp;

        if (otp.length != 6) {
          addToast(
            "error",
            "6 Digit OTP Required!",
            "A 6 digit OTP is required for authentication"
          );
        } else {
          await makePostRequest(
            "http://localhost:8000/api/v1/auth/verify-otp",
            {
              email: formData?.email,
              password: formData?.password,
              otp,
            }
          );
        }
      },
      onSuccess: () => {
        window.location.href = "/";
      },
      onError: async (error) => {
        addToast("error", error?.title, error?.message);
      },
    });

  return {
    displayType,
    formData,
    otpGeneratedAt,
    isRequestPending:
      isOtpReqPending || isLoginReqPending || isOTPVerifcationReqPending,
    submitHandler:
      displayType == "login" ? loginSubmitHandler : signupSubmitHandler,
    handleInput,
    resendOTPHandler,
  };
}

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export { useAuthFormHooks };
