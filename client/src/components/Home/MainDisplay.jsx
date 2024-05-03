import React from "react";
import SideBar from "../Sidebar/SideBar";
import ClientDashboard from "../Dashboard/Client/Dashboard";
import AdminDashboard from "../Dashboard/Admin/Dashboard";

const MainDisplay = () => {
  const [userRole, setUserRole] = React.useState("client");

  return (
    <div className="flex bg-gray-950 font-sans text-gray-200">
      <SideBar />
      <div className="flex flex-1 bg-gray-950 h-screen overflow-hidden">
        {userRole === "client" && <ClientDashboard />}
        {userRole === "admin" && <AdminDashboard />}
      </div>
    </div>
  );
};

export default MainDisplay;
