import { useRef, useState, useCallback, useContext, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useEmailVerification from "@hooks/useEmailVerification";
import { GlobalContext } from "@context/GlobalContextProvider";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";
import useInputHooks from "./useInputHooks";

function useVerifyEmailFormHooks() {
  const { addToast } = useContext(GlobalContext);
  const {
    setStep,
    mPersonalDetails,
    isEmailVerified,
    setIsEmailVerified,
    otpGeneratedAt,
    setOtpGeneratedAt,
  } = useContext(OnboardingContext);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isApiReqPending, setIsApiReqPending] = useState(false);
  const inputRefs = useRef([]);

  const queryClient = useQueryClient();

  const { generateOTP, verifyOTP } = useEmailVerification({
    setOtpGeneratedAt,
  });

  const email = useMemo(() => mPersonalDetails?.email, [mPersonalDetails]);

  const { handleChange, handleBackspace } = useInputHooks({
    otp,
    inputRefs,
    setOtp,
  });

  const resendOTPHandler = useCallback(async () => {
    setIsApiReqPending(true);
    await generateOTP(
      { email },
      {
        onSuccess: () => {
          addToast("info", "OTP Resended!", "An OTP is resended on your email");
        },
      },
    );
    setIsApiReqPending(false);
  }, [addToast, email, generateOTP]);

  const verifyOTPHandler = useCallback(async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      addToast(
        "error",
        "6 Digit OTP Required!",
        "A 6 digit OTP is required for email verification",
      );
    } else {
      setIsApiReqPending(true);
      await verifyOTP(
        { email, otp: otpString },
        {
          onSuccess: async () => {
            setIsEmailVerified(true);
            await queryClient.refetchQueries({
              queryKey: ["user"],
              exact: true,
            });
          },
        },
      );
      setIsApiReqPending(false);
    }
  }, [addToast, email, otp, setIsEmailVerified, queryClient, verifyOTP]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmailVerified) {
      setStep((prev) => ++prev);
    } else {
      addToast(
        "warning",
        "Email Verification Required!",
        "Verify your email to proceed to the next step",
      );
    }
  };

  return {
    otp,
    email,
    inputRefs,
    isEmailVerified,
    otpGeneratedAt,
    isApiReqPending,
    handleChange,
    handleBackspace,
    resendOTPHandler,
    verifyOTPHandler,
    handleSubmit,
  };
}

export default useVerifyEmailFormHooks;
