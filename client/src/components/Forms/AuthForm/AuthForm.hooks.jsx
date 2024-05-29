import { useState, useCallback, useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { makePostRequest } from "@api/api";
import { useMutation } from "@tanstack/react-query";

import {
  checkEmail,
  checkPassword,
  checkOTP,
  isLoginDataValid,
} from "./errorCheckers";

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
      return await makePostRequest(
        "http://localhost:8000/api/v1/auth/generate-otp",
        {
          email: formData?.email,
          password: formData?.password,
        }
      );
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
        const isValid = await isLoginDataValid(formData);

        console.log(isValid);

        if (!isValid) {
          throw {
            title: "Invalid form data!",
            message: "Enter valid form data to continue with email",
          };
        } else {
          await makePostRequest(
            "http://localhost:8000/api/v1/auth/login-local",
            {
              email: formData?.email,
              password: formData?.password,
            }
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
    checkEmail,
    checkPassword,
    checkOTP,
    isRequestPending:
      isOtpReqPending || isLoginReqPending || isOTPVerifcationReqPending,
    submitHandler:
      displayType == "login" ? loginSubmitHandler : signupSubmitHandler,
    handleInput,
    resendOTPHandler,
  };
}

export { useAuthFormHooks };
