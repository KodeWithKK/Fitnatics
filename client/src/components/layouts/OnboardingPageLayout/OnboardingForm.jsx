import { useCallback, useContext, useMemo } from "react";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";
import cn from "@utils/cn";

const OnboardingForm = ({
  onSubmit,
  onSubmitButtonClick,
  isSubmitting,
  className,
  children,
}) => {
  const { step, setStep, navItems } = useContext(OnboardingContext);

  const backButtonHandler = useCallback(() => {
    setStep((prevStep) => --prevStep);
  }, [setStep]);

  return (
    <form className="" onSubmit={onSubmit}>
      <main className="h-full w-full">
        <div className={className}>{children}</div>
      </main>

      <footer
        className={cn(
          "fixed bottom-0 z-[100] flex w-full select-none gap-2.5 rounded-t-md border-t border-gray-900 bg-gray-900 px-6 py-2",
          step == navItems.length && "justify-start",
          step != navItems.length && "justify-between",
        )}
        style={{ width: "calc(100% - 326px)" }}
      >
        <button
          type="button"
          className="w-[70.58px] rounded-md bg-gray-800 px-4 py-2"
          onClick={backButtonHandler}
        >
          Back
        </button>

        {step < navItems.length && (
          <button
            type="submit"
            className="w-[70.58px] rounded-md bg-brand px-4 py-2"
            onClick={onSubmitButtonClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : "Next"}
          </button>
        )}
      </footer>
    </form>
  );
};

function Headline({ className, style }) {
  const { step, navItems } = useContext(OnboardingContext);

  const stepDescription = useMemo(() => {
    return navItems[step - 1].description;
  }, [navItems, step]);

  return (
    <div className={className} style={style}>
      <p className="mb-0.5 text-sm text-gray-600">{`Step 0${step}`}</p>
      <h3 className="text-[21px] font-semibold text-gray-100">
        {stepDescription}
      </h3>
    </div>
  );
}

OnboardingForm.Headline = Headline;

export default OnboardingForm;
