import React from "react";
import AuthHome from "./components/Home/AuthHome";
import MainDisplay from "./components/Home/MainDisplay";
import ToastStack from "./components/ToastStack/ToastStack";
import Modal from "./components/Modal/Modal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContextProvider";

function App() {
  const { toasts, removeToast } = React.useContext(GlobalContext);

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
