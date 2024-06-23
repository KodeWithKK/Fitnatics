import React from "react";
import ClientDashboard from "@components/Dashboard/Client/Dashboard";
import AdminDashboard from "@components/Dashboard/Admin/Dashboard";
import MainAppPageLayout from "@layouts/MainAppPageLayout";

const MainAppPage = () => {
  const [userRole, setUserRole] = React.useState("member");

  return (
    <MainAppPageLayout>
      {userRole === "member" && <ClientDashboard />}
      {userRole === "admin" && <AdminDashboard />}
    </MainAppPageLayout>
  );
};

export default MainAppPage;
