import React from "react";
import AuthHome from "./components/Home/AuthHome";
import MainDisplay from "./components/Home/MainDisplay";
import ToastStack from "./components/ToastStack/ToastStack";
import Modal from "./components/Modal/Modal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContextProvider";
import { makeGetRequest } from "./api/api";

let isRequestMade = false;

function App() {
  const { toasts, removeToast } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!isRequestMade) {
      isRequestMade = true;

      (async () => {
        const { data, error } = await makeGetRequest(
          "http://localhost:8000/api/v1/user/get-user-data"
        );

        console.log(data);
        console.log(error);
      })();
    }
  }, []);

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
