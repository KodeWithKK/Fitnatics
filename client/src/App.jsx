import React from "react";
import Home from "./components/Home/Home";
import AuthForm from "./components/AuthForm/AuthForm";
import SetupAccountForm from "./components/SetupAccountForm/SetupAccountForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

export const GlobalContext = React.createContext();

function App() {
  const [userData, setUserData] = React.useState({});
  const value = React.useMemo(() => {
    return {
      userData,
      setUserData,
    };
  }, [userData]);

  return (
    <GlobalContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/setup-account" element={<SetupAccountForm />} />
          <Route path="/:nav" element={<Home />} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
