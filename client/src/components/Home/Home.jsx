import React from "react";
import SideBar from "../Sidebar/SideBar";
import ClientDashboard from "../Dashboard/Client/Dashboard";
import AdminDashboard from "../Dashboard/Admin/Dashboard";

const Home = () => {
  const [userRole, setUserRole] = React.useState("client");

  return (
    <div className="flex bg-gray-950 text-gray-200 font-sans">
      <SideBar />
      <div className="bg-gray-950 h-screen flex-1 flex overflow-hidden">
        {userRole === "client" && <ClientDashboard />}
        {userRole === "admin" && <AdminDashboard />}
      </div>
    </div>
  );
};

export default Home;
