import React from "react";

function StepsTracker({ totalSteps, currentStep, className }) {
  return (
    <div className={`mb-8 flex items-center justify-center ${className}`}>
      {[...Array(totalSteps)].map((_, i) => (
        <React.Fragment key={`step-${i}`}>
          <div
            className={`grid h-6 w-6 place-items-center ${
              i < currentStep ? "bg-brand/[.9]" : "bg-gray-200/[.9]"
            } select-none rounded-full font-semibold text-gray-950`}
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
