import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useFetchUserData } from "@hooks/useFetchUserData";
import ToastStackLayout from "@/layouts/ToastStackLayout";
import AuthPage from "@pages/AuthPage/AuthPage";
import MainAppPage from "@pages/MainAppPage/MainAppPage";
import SetupAccountPage from "@pages/SetupAccountPage/SetupAccountPage";
// import SetupAccountForm from "./components/Forms/SetupAccountForm";

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
            element={userData ? <SetupAccountPage /> : <AuthPage />}
          />
          <Route path="/:nav" element={<MainAppPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
