import { Route, Routes, Navigate } from "react-router-dom";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ClientDashboard from "@components/Dashboard/Client/Dashboard";
import AdminDashboard from "@components/Dashboard/Admin/Dashboard";
import MainAppPageLayout from "@layouts/MainAppPageLayout";

const MainAppPage = () => {
  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  if (!user?.role) {
    return null;
  }

  return (
    <MainAppPageLayout>
      {user.role === "member" && (
        <Routes>
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
      {user.role === "admin" && (
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      )}
    </MainAppPageLayout>
  );
};

export default MainAppPage;
