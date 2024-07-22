import SideBar from "@layouts/Sidebar/SideBar";

const MainAppPageLayout = ({ children }) => {
  return (
    <div className="flex font-sans text-gray-200 bg-gray-950">
      <SideBar />
      <div className="flex flex-1 h-screen overflow-hidden bg-gray-950">
        {children}
      </div>
    </div>
  );
};

export default MainAppPageLayout;
