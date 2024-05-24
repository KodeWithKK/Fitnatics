import SideBar from "@/components/Sidebar/SideBar";

const MainAppPageLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-950 font-sans text-gray-200">
      <SideBar />
      <div className="flex flex-1 bg-gray-950 h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MainAppPageLayout;
