import React from "react";
import Home from "./components/Home/Home";
import AuthForm from "./components/Form/AuthForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/:nav" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
