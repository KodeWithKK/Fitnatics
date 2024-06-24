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
      {user.role === "member" && <ClientDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </MainAppPageLayout>
  );
};

export default MainAppPage;
