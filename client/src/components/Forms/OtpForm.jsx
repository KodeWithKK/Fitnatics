import React from "react";

const OtpForm = ({ formData }) => {
  const inputRefs = React.useRef([]);

  const handleOnChange = React.useCallback((e, idx) => {
    e.target.value = e.target.value.slice(-1);

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
      <a
        className="block font-bold text-brand text-4xl text-center tracking-wide uppercase mb-6"
        href="/"
      >
        Fitnatics
      </a>

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

        <div>
          <button className="w-full bg-brand/[0.75] p-2.5 font-semibold rounded-md">
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

function StepsTracker({ totalSteps, currentStep }) {
  return (
    <div className="flex justify-center items-center mb-6">
      {[...Array(totalSteps)].map((_, i) => (
        <React.Fragment key={`step-${i}`}>
          <div
            className={`grid place-items-center w-6 h-6 ${
              i < currentStep ? "bg-brand/[.9]" : "bg-gray-200/[.9]"
            } font-semibold text-gray-950 rounded-full select-none`}
          >
            {i + 1}
          </div>
          {i !== totalSteps - 1 && (
            <div
              className={`h-1 w-4 ${
                i < currentStep - 1 ? "bg-brand/[.4]" : "bg-gray-200/[.4]"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default OtpForm;
