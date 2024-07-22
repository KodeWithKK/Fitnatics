import { useMemo, createContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ClientDashboard from "@features/Dashboard/Client/Dashboard";
import AdminDashboard from "@features/Dashboard/Admin/Dashboard";
import MainAppPageLayout from "@layouts/MainAppPageLayout/MainAppPageLayout";

export const MainAppPageContext = createContext();

const MainAppPage = () => {
  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  const value = useMemo(() => {
    return {};
  }, []);

  return (
    <MainAppPageContext.Provider value={value}>
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
    </MainAppPageContext.Provider>
  );
};

export default MainAppPage;
