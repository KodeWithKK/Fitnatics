import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContextProvider";
import { makeGetRequest } from "./api/api";
import AuthHome from "./components/Home/AuthHome";
import SetupAccountForm from "./components/Forms/SetupAccountForm";
import MainDisplay from "./components/Home/MainDisplay";
import ToastStack from "./components/ToastStack/ToastStack";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Modal from "./components/Modal/Modal";

function App() {
  const { toasts, removeToast } = React.useContext(GlobalContext);

  const { isLoading, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await makeGetRequest(
        "http://localhost:8000/api/v1/user/get-user-data"
      );
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <ToastStack toasts={toasts} removeToast={removeToast} />
      {/* <Modal /> */}

      <Router>
        <Routes>
          <Route path="/" element={<AuthHome />} />
          <Route path="/:nav" element={<MainDisplay />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
