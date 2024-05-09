import React from "react";
import StepsTracker from "./atoms/StepsTracker";
import OtpTimer from "./atoms/OtpTimer";
import { verifyOTP } from "../../api/api";

const OtpForm = ({
  formData,
  otpGeneratedAt,
  resendOTPHandler,
  setDisplay,
}) => {
  const [otp, setOtp] = React.useState(Array(6).fill(""));
  const inputRefs = React.useRef([]);

  const formSubmitHandle = React.useCallback(
    async (e) => {
      e.preventDefault();

      const isOTPCorrect = await verifyOTP(
        formData?.email,
        formData?.password,
        otp.join("")
      );

      if (isOTPCorrect) {
        setDisplay("setup-account");
      }
    },
    [formData, otp, setDisplay]
  );

  const handleChange = React.useCallback(
    (e, idx) => {
      const value = e.target.value;
      e.target.value = value.slice(0, 1);

      const nextOtp = [...otp];
      nextOtp[idx] = value;
      setOtp(nextOtp);

      if (e.target.value && idx < 6 - 1) {
        inputRefs.current[idx + 1].focus();
      }
    },
    [otp]
  );

  const handleBackspace = React.useCallback(
    (e, idx) => {
      if (e.key === "Backspace") {
        const value = e.target.value;
        const nextOtp = [...otp];
        nextOtp[idx] = value;
        setOtp(nextOtp);

        if (idx > 0) inputRefs.current[idx - 1].focus();
      }
    },
    [otp]
  );

  const handleEnter = React.useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        formSubmitHandle();
      }
    },
    [formSubmitHandle]
  );

  return (
    <div className="bg-gray-950 px-[6%] py-8 h-screen overflow-y-auto">
      <div className="mb-6 text-center">
        <a
          className="font-bold text-4xl text-brand uppercase tracking-wide"
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <StepsTracker totalSteps={4} currentStep={2} />

      <form
        className="space-y-6 border-2 border-gray-800/[.5] mx-auto px-12 py-8 border-dashed rounded-md max-w-[586px] h-fit text-gray-200"
        onSubmit={formSubmitHandle}
      >
        <h1 className="font-bold text-2xl text-center text-gray-200">
          Account Verification
        </h1>

        <div>
          <p className="text-gray-500 text-pretty text-sm">
            Please enter the OTP (One Time Password) sent to your email{" ("}
            {formData.email.split("@")[0].length > 4
              ? formData.email.split("@")[0].substring(0, 4) +
                "***@" +
                formData.email.split("@")[1]
              : formData.email}
            {") "}
            to complete the user verification.
          </p>
        </div>

        <div className="py-2">
          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, i) => (
              <input
                key={`input-${i}`}
                ref={(el) => inputRefs.current.push(el)}
                type="number"
                maxLength={1}
                onChange={(e) => handleChange(e, i)}
                onKeyUp={(e) => handleBackspace(e, i)}
                onKeyPress={handleEnter}
                className="border-2 border-gray-800/[.85] bg-transparent rounded-md w-14 h-14 text-2xl text-center focus:ring-offset-brand focus:ring-brand focus:border-brand"
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-gray-500 text-sm">
            <OtpTimer otpGeneratedAt={otpGeneratedAt} />
            <button
              className="underline underline-offset-4"
              onClick={(e) => {
                e.preventDefault();
                resendOTPHandler();
              }}
            >
              Resend Code
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="bg-gray-800/[0.8] p-2.5 rounded-md w-full font-semibold"
            onClick={(e) => {
              e.preventDefault();
              setDisplay("root");
            }}
          >
            Go Back
          </button>
          <button
            type="submit"
            className="bg-brand/[0.75] p-2.5 rounded-md w-full font-semibold"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
