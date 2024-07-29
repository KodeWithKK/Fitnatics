import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "@pages/AuthPage/AuthPage";
import MainAppPage from "@pages/MainAppPage/MainAppPage";
import OnboardingPage from "@pages/OnboardingPage/OnboardingPage";
import TestingUIPage from "@pages/TestingUIPage/TestingUIPage";
import ErrorRedirects from "@pages/ErrorRedirects/ErrorRedirects";

function AppRoutes({ user }) {
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/error/account-already-exists"
          element={<ErrorRedirects />}
        />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (user?.accountSetupRequired) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/ui" element={<TestingUIPage />} />
        <Route path="/*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  if (user && !user.accountSetupRequired) {
    return (
      <Routes>
        <Route path="*" element={<MainAppPage />} />
      </Routes>
    );
  }
}

export default AppRoutes;
