import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useFetchUserData } from "@hooks/useFetchUserData";
import ToastStackLayout from "@/layouts/ToastStackLayout";
import AuthPage from "@pages/AuthPage/AuthPage";
import MainAppPage from "@pages/MainAppPage/MainAppPage";
import GettingStartedPage from "@pages/GettingStartedPage/GettingStartedPage";
import ErrorRedirects from "@pages/ErrorRedirects/ErrorRedirects";

function App() {
  const { toasts, removeToast } = React.useContext(GlobalContext);
  const { isLoading, userData } = useFetchUserData();

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-gray-975 font-normal font-sans text-base text-gray-100 leading-[1.6]">
      <ToastStackLayout toasts={toasts} removeToast={removeToast} />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userData ? (
                userData.accountSetupRequired ? (
                  <Navigate to="/getting-started" replace />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              ) : (
                <AuthPage />
              )
            }
          />
          <Route
            path="/getting-started"
            element={
              userData ? <GettingStartedPage /> : <Navigate to="/" replace />
            }
          />
          <Route path="/:nav" element={<MainAppPage />} />
          <Route
            path="/error/account-already-exists"
            element={<ErrorRedirects />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
