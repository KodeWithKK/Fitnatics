import React from "react";
import AuthHome from "./components/Home/AuthHome";
import MainDisplay from "./components/Home/MainDisplay";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          <Route path="/" element={<AuthHome />} />
          <Route path="/:nav" element={<MainDisplay />} />
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
