import SideBar from "@layouts/Sidebar/SideBar";

const MainAppPageLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-950 font-sans text-gray-200">
      <SideBar />
      <div className="flex h-screen flex-1 overflow-hidden bg-gray-950">
        {children}
      </div>
    </div>
  );
};

export default MainAppPageLayout;
