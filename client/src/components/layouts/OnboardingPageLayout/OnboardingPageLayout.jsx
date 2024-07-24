import { useLogoutUser } from "@hooks/useLogoutUser";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";
import { useContext } from "react";
import SideNavBar from "./SideNavBar";

const OnboardingPageLayout = ({ children }) => {
  const { logoutUser } = useLogoutUser();
  const { step } = useContext(OnboardingContext);

  return (
    <div>
      {step == 0 && (
        <FirstPageLayout handleLogout={logoutUser}>{children}</FirstPageLayout>
      )}

      {step != 0 && (
        <div className="pl-[326px]">
          <SideNavBar />

          <div className="min-h-screen pb-[58.6px] pt-4">
            <NextStepsNavBar handleLogout={logoutUser} />
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

function FirstPageLayout({ children, handleLogout }) {
  return (
    <div className="h-screen overflow-y-auto">
      <FirstStepNavBar handleLogout={handleLogout} />
      <div className="mt-2 h-[calc(100vh-95px)] overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function FirstStepNavBar({ handleLogout }) {
  return (
    <nav className="flex items-center justify-between gap-4 rounded-md px-10 py-4">
      <h2 className="font-bold uppercase tracking-wide text-brand">
        Fitnatics
      </h2>

      <p className="text-gray-100">
        Already a member?{" "}
        <button type="button" className="text-blue-500" onClick={handleLogout}>
          Login
        </button>
      </p>
    </nav>
  );
}

function NextStepsNavBar({ handleLogout }) {
  return (
    <div className="flex h-[39.18px] items-center justify-end px-10 py-4">
      <p className="text-right text-gray-100">
        Already a member?{" "}
        <button type="button" className="text-blue-500" onClick={handleLogout}>
          Login
        </button>
      </p>
    </div>
  );
}

export default OnboardingPageLayout;
