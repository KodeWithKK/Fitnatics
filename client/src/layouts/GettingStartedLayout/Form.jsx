import { useCallback, useContext } from "react";
import { GettingStartedContext } from "./GettingStartedLayout";

const Form = ({ onSubmit, stepTitle, children }) => {
  const { step, setStep } = useContext(GettingStartedContext);

  const backButtonHandler = useCallback(() => {
    setStep((prevStep) => {
      if (prevStep > 1) {
        return --prevStep;
      }
      return prevStep;
    });
  }, [setStep]);

  const moveNextStep = useCallback(() => {
    setStep((prevStep) => {
      if (prevStep < 4) {
        return ++prevStep;
      }
      return prevStep;
    });
  }, [setStep]);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(moveNextStep);
    },
    [onSubmit, moveNextStep]
  );

  return (
    <form className="relative flex pb-[58.6px] h-full" onSubmit={submitHandler}>
      <main className="w-full h-full overflow-y-auto">{children}</main>

      <footer className="bottom-0 absolute flex justify-between items-center gap-2.5 border-gray-900 bg-[#282b2f] px-4 py-2 border-t rounded-md w-full select-none">
        <p className="text-gray-300/[.9]">{stepTitle}</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-gray-800 px-4 py-2 rounded-md"
            onClick={backButtonHandler}
          >
            Back
          </button>
          {step < 4 && (
            <button type="submit" className="bg-brand px-4 py-2 rounded-md">
              Next
            </button>
          )}
        </div>
      </footer>
    </form>
  );
};

export default Form;
