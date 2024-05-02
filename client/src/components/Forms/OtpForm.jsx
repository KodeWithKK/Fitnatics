import React from "react";
import StepsTracker from "./atoms/StepsTracker";

const OtpForm = ({ formData }) => {
  const [otpTimeLeft, setOtpTimeLeft] = React.useState({ min: 14, sec: 59 });
  const inputRefs = React.useRef([]);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextOtpTimeLeft = { ...otpTimeLeft };

      if (nextOtpTimeLeft.sec !== 0) {
        nextOtpTimeLeft.sec--;
      } else {
        nextOtpTimeLeft.min--;
        nextOtpTimeLeft.sec = 59;
      }

      setOtpTimeLeft(nextOtpTimeLeft);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [otpTimeLeft]);

  const handleOnChange = React.useCallback((e, idx) => {
    e.target.value = e.target.value.slice(0, 1);

    if (e.target.value && idx < 6 - 1) {
      inputRefs.current[idx + 1].focus();
    }
  }, []);

  const handleBackspace = React.useCallback((e, idx) => {
    if (e.key === "Backspace" && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  }, []);

  const formSubmitHandle = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
    },
    [formData]
  );

  return (
    <div className="bg-gray-950 h-screen py-8 px-[6%] overflow-y-auto">
      <div className="text-center mb-6">
        <a
          className="font-bold text-brand text-4xl tracking-wide uppercase "
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <StepsTracker totalSteps={4} currentStep={2} />

      <form
        className="mx-auto max-w-[586px] h-fit px-[6%] py-8 space-y-8 text-gray-200 border-2 border-dashed border-gray-900 rounded-md"
        onSubmit={formSubmitHandle}
      >
        <h1 className="font-bold text-gray-200 text-2xl text-center">
          OTP Verification
        </h1>

        <div>
          <p className="text-gray-500 text-sm">
            Please enter the OTP (One Time Password) sent to your email to
            complete the user verification.
          </p>
        </div>

        <div>
          <div className="flex justify-between gap-2">
            {[...Array(6)].map((_, i) => (
              <input
                key={`input-${i}`}
                ref={(el) => inputRefs.current.push(el)}
                type="number"
                maxLength={1}
                onChange={(e) => handleOnChange(e, i)}
                onKeyUp={(e) => handleBackspace(e, i)}
                className="w-14 h-14 rounded-md bg-transparent border-2 border-gray-800 text-center text-2xl"
              />
            ))}
          </div>
          <div className="flex justify-between text-gray-500 text-sm mt-4">
            <span>{`${otpTimeLeft.min
              .toString()
              .padStart(2, 0)}:${otpTimeLeft.sec
              .toString()
              .padStart(2, 0)}`}</span>
            <a href="#" className="underline underline-offset-4">
              Resend Code
            </a>
          </div>
        </div>

        <div>
          <button className="w-full bg-brand/[0.75] p-2.5 font-semibold rounded-md">
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
