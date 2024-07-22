import { Route, Routes, Navigate } from "react-router-dom";
import ClientDashboard from "@features/Dashboard/Client/Dashboard";
import AdminDashboard from "@features/Dashboard/Admin/Dashboard";

function MainAppPageRoutes({ role }) {
  if (role === "member") {
    return (
      <Routes>
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  if (role === "admin") {
    return (
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }
}

export default MainAppPageRoutes;
