import { useCallback, useContext, useMemo } from "react";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";

const Form = ({ onSubmit, onSubmitButtonClick, children }) => {
  const { step, setStep, isFormRequestPending, navItems } = useContext(
    GettingStartedContext
  );

  const backButtonHandler = useCallback(() => {
    setStep((prevStep) => {
      if (prevStep > 1) {
        return --prevStep;
      }
      return prevStep;
    });
  }, [setStep]);

  const stepDescription = useMemo(() => {
    return navItems.at(step - 2).description;
  }, [navItems, step]);

  return (
    <form className="relative flex pb-[58.6px] h-full" onSubmit={onSubmit}>
      <main className="w-full h-full overflow-y-auto">{children}</main>

      <footer className="bottom-0 absolute flex justify-between items-center gap-2.5 border-gray-900 bg-[#282b2f] px-4 py-2 border-t rounded-md w-full select-none">
        <p className="text-gray-300/[.9]">{`Step 0${
          step - 1
        } - ${stepDescription}`}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-gray-800 px-4 py-2 rounded-md w-[70.58px]"
            onClick={backButtonHandler}
          >
            Back
          </button>
          {step < navItems.length + 1 && (
            <button
              type="submit"
              className="bg-brand px-4 py-2 rounded-md w-[70.58px]"
              onClick={onSubmitButtonClick}
              disabled={isFormRequestPending}
            >
              {isFormRequestPending ? "..." : "Next"}
            </button>
          )}
        </div>
      </footer>
    </form>
  );
};

export default Form;
