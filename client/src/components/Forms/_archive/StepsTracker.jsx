import React from "react";

function StepsTracker({ totalSteps, currentStep, className }) {
  return (
    <div className={`flex justify-center items-center mb-8 ${className}`}>
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

export default StepsTracker;
