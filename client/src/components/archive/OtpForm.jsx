import React from "react";
import { makePostRequest } from "@api/apiClient";
import { GlobalContext } from "@context/GlobalContextProvider";
import OtpTimer from "./atoms/OtpTimer";

const OtpForm = ({
  formData,
  otpGeneratedAt,
  resendOTPHandler,
  setDisplay,
}) => {
  const [otp, setOtp] = React.useState(Array(6).fill(""));

  const inputRefs = React.useRef([]);
  const { addToast } = React.useContext(GlobalContext);

  const formSubmitHandle = React.useCallback(
    async (e) => {
      e.preventDefault();

      const inputOtp = otp.join("");

      if (inputOtp.length != 6) {
        addToast(
          "error",
          "6 Digit OTP Required!",
          "A 6 digit OTP is required for authentication",
        );
      } else {
        try {
          await makePostRequest(
            "http://localhost:8000/api/v1/auth/verify-otp",
            {
              email: formData?.email,
              password: formData?.password,
              otp: inputOtp,
            },
          );
          window.location.href = "http://localhost:5173/";
        } catch (error) {
          addToast("error", error?.title, error?.message);
        }
      }
    },
    [formData, otp, addToast],
  );

  const handleChange = React.useCallback(
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
    [otp],
  );

  const handleBackspace = React.useCallback(
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
    [otp],
  );

  return (
    <div className="h-screen overflow-y-auto px-[6%] py-8">
      <div className="mb-6 text-center">
        <a
          className="text-[35px] font-bold uppercase tracking-wide text-brand"
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <form
        className="mx-auto h-fit max-w-[586px] space-y-6 rounded-md border-2 border-dashed border-gray-800/[.5] px-[6%] py-8 text-gray-200"
        onSubmit={formSubmitHandle}
      >
        <h1 className="text-center text-2xl font-bold text-gray-200">
          Account Verification
        </h1>

        <div>
          <p className="text-pretty text-sm text-gray-500">
            Please enter the OTP (One Time Password) sent to your email{" ("}
            {formData.email.split("@")[0].length > 2
              ? formData.email.split("@")[0].substring(0, 2) +
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
                value={otp[i]}
                onChange={(e) => handleChange(e, i)}
                onKeyUp={(e) => handleBackspace(e, i)}
                className="h-[52px] w-[52px] rounded-md border-2 border-gray-800/[.85] bg-transparent text-center text-2xl focus:border-brand focus:ring-brand focus:ring-offset-brand"
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <OtpTimer otpGeneratedAt={otpGeneratedAt} />
            <button
              type="button"
              className="underline underline-offset-4"
              onClick={resendOTPHandler}
            >
              Resend Code
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="w-full rounded-md bg-gray-800/[0.8] p-2.5 font-semibold"
            onClick={() => setDisplay("root")}
          >
            Go Back
          </button>
          <button
            type="submit"
            className="w-full rounded-md bg-brand/[0.75] p-2.5 font-semibold"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
