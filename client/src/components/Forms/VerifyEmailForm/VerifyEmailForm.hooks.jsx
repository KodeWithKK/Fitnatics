import useEmailVerification from "@hooks/useEmailVerification";
import { GlobalContext } from "@context/GlobalContextProvider";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";
import { useRef, useState, useCallback, useContext, useMemo } from "react";

function useVerifyEmailFormHooks() {
  const { addToast, refetch } = useContext(GlobalContext);
  const {
    setStep,
    memberPersonalData,
    isEmailVerified,
    setIsEmailVerified,
    otpGeneratedAt,
    setOtpGeneratedAt,
  } = useContext(GettingStartedContext);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isApiReqPending, setIsApiRequestPending] = useState(false);
  const inputRefs = useRef([]);

  const { generateOTP, verifyOTP } = useEmailVerification({
    setOtpGeneratedAt,
  });

  const email = useMemo(() => memberPersonalData?.email, [memberPersonalData]);

  const handleChange = useCallback(
    (e, idx) => {
      const value = e.target.value;

      if (value.length === 1) {
        const nextOtp = [...otp];
        nextOtp[idx] = value;
        setOtp(nextOtp);

        if (idx < 5) {
          inputRefs.current[idx + 1].focus();
        }
      }

      if (value.length == 2 && idx < 5) {
        const otpString = otp.join("");
        const nextOtpString =
          otpString.substring(0, idx) + value + otpString.substring(idx + 1);

        const nextOtp = [...Array(6)];
        nextOtp.forEach((_, i) => {
          nextOtp[i] = nextOtpString[i];
        });

        setOtp(nextOtp);
        inputRefs.current[idx + 1].focus();
      }
    },
    [otp]
  );

  const handleBackspace = useCallback(
    (e, idx) => {
      if (e.key === "Backspace") {
        const nextOtp = [...otp];
        nextOtp[idx] = "";

        if (idx > 0 && !otp[idx]) {
          inputRefs.current[idx - 1].value = "";
          nextOtp[idx - 1] = "";
          inputRefs.current[idx - 1].focus();
        }
        setOtp(nextOtp);
      }
    },
    [otp]
  );

  const resendOTPHandler = useCallback(async () => {
    setIsApiRequestPending(true);
    await generateOTP(
      { email },
      {
        onSuccess: () => {
          addToast("info", "OTP Resended!", "An OTP is resended on your email");
        },
      }
    );
    setIsApiRequestPending(false);
  }, [addToast, email, generateOTP]);

  const verifyOTPHandler = useCallback(async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      addToast(
        "error",
        "6 Digit OTP Required!",
        "A 6 digit OTP is required for email verification"
      );
    } else {
      setIsApiRequestPending(true);
      await verifyOTP(
        { email, otp: otpString },
        {
          onSuccess: () => {
            setIsEmailVerified(true);
            refetch.user();
          },
        }
      );
      setIsApiRequestPending(false);
    }
  }, [addToast, email, otp, setIsEmailVerified, refetch, verifyOTP]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmailVerified) {
      setStep((prev) => ++prev);
    } else {
      addToast(
        "warning",
        "Email Verification Required!",
        "Verify your email to proceed to the next step"
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
