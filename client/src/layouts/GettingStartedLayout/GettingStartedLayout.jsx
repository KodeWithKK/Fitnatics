import { createContext, useMemo } from "react";
import SideNavbar from "./SideNavbar";
import Form from "./Form";

export const GettingStartedContext = createContext();

const GettingStartedLayout = ({ step, setStep, children }) => {
  const value = useMemo(() => {
    return {
      step,
      setStep,
    };
  }, [step, setStep]);

  return (
    <GettingStartedContext.Provider value={value}>
      <div className="flex border-gray-900 bg-gray-950 border rounded-md h-full">
        <SideNavbar currStep={step - 1} setStep={setStep} />

        <div className="border-gray-900 bg-gray-900/[.55] border-l rounded-md w-full h-full">
          {children}
        </div>
      </div>
    </GettingStartedContext.Provider>
  );
};

GettingStartedLayout.Form = Form;

export default GettingStartedLayout;
