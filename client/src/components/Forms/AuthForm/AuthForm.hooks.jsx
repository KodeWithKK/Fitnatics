import { useState, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signupSchema } from "./validators";
import { useMutation } from "@tanstack/react-query";
import { GlobalContext } from "@context/GlobalContextProvider";
import apiClient from "@api/apiClient";

function useAuthFormHooks() {
  const [displayType, setDisplayType] = useState("login");
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const { addToast } = useContext(GlobalContext);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(displayType === "login" ? loginSchema : signupSchema),
    mode: "onChange",
  });

  const formData = watch();

  const { isPending: isOtpReqPending, mutate: generateOTP } = useMutation({
    mutationFn: async () => {
      return await apiClient.post(
        import.meta.env.VITE_BACKEND_API_BASE + "/auth/generate-otp",
        {
          email: formData?.email,
          password: formData?.password,
        }
      );
    },
    onMutate: () => {
      setOtpGeneratedAt(null);
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

  const onLoginValidationError = () => {
    addToast(
      "error",
      "Invalid form data!",
      "Enter valid form data to continue with email"
    );
  };

  const { isPending: isLoginReqPending, mutate: onLoginValidationSuccess } =
    useMutation({
      mutationFn: async () => {
        await apiClient.post(
          import.meta.env.VITE_BACKEND_API_BASE + "/auth/login-local",
          {
            email: formData?.email,
            password: formData?.password,
          }
        );
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

  const onSignupValidationError = () => {
    addToast(
      "error",
      "6 Digit OTP Required!",
      "A 6 digit OTP is required for authentication"
    );
  };

  const {
    isPending: isOTPSignupReqPending,
    mutate: onSignupValidationSuccess,
  } = useMutation({
    mutationFn: async () => {
      await apiClient.post(
        import.meta.env.VITE_BACKEND_API_BASE + "/auth/verify-otp",
        {
          email: formData.email,
          password: formData.password,
          otp: formData.otp,
        }
      );
    },
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: async (error) => {
      addToast("error", error?.title, error?.message);
    },
  });

  const isRequestPending =
    isOtpReqPending || isLoginReqPending || isOTPSignupReqPending;

  const onSubmit =
    displayType == "login"
      ? onLoginValidationSuccess
      : onSignupValidationSuccess;

  const onError =
    displayType == "login" ? onLoginValidationError : onSignupValidationError;

  return {
    displayType,
    otpGeneratedAt,
    isRequestPending,
    errors,
    register,
    handleSubmit: handleSubmit(onSubmit, onError),
    resendOTPHandler,
  };
}

export { useAuthFormHooks };
