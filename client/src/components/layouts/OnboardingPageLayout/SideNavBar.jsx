import { GlobalContext } from "@context/GlobalContextProvider";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";
import { useContext } from "react";

function SideNavBar() {
  const { addToast } = useContext(GlobalContext);
  const { step, setStep, navItems } = useContext(OnboardingContext);

  return (
    <aside className="fixed left-0 top-0 h-screen w-[326px] bg-gray-900/[.55] px-10 py-4">
      <h2 className="text-left font-bold uppercase tracking-wide text-brand">
        Fitnatics
      </h2>
      <div className="mt-6 text-left">
        <h3 className="text-[21px] font-semibold text-gray-100">
          Let&apos;s Get you Started
        </h3>
        <p className="mt-0.5 text-sm text-gray-600">
          Enter the details to get going
        </p>
      </div>

      <div className="mt-7 flex h-fit gap-4">
        <div className="relative w-[3px] rounded-full bg-gray-800">
          <ActiveNavitemIndicator
            currStep={step}
            totalSteps={navItems.length}
          />
        </div>

        {/* FORM NAV BUTTONS */}
        <div className="flex flex-col">
          {navItems.map(({ title }, idx) => (
            <button
              key={window.crypto.randomUUID()}
              type="button"
              className="relative py-[4px] text-left text-[15px]"
              onClick={() => {
                if (step >= idx + 1) {
                  setStep(idx + 1);
                } else {
                  addToast(
                    "warning",
                    "Navigation Not Allowed!",
                    "Only backward Sidebar navigation is allowed",
                  );
                }
              }}
            >
              <span
                className={`${step === idx + 1 && "text-brand"} ${
                  step > idx + 1 && "text-brand opacity-60"
                } ${step < idx + 1 && "text-gray-600"}`}
              >
                {title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ActiveNavitemIndicator({ currStep, totalSteps }) {
  return (
    <div
      className={`absolute top-0 w-full rounded-full bg-blue-500 transition-all duration-700`}
      style={{ height: `calc(100% / ${totalSteps} * ${currStep})` }}
    ></div>
  );
}

export default SideNavBar;
