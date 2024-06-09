import SideNavbar from "./SideNavbar";
import Form from "./Form";

const SteperLayout = ({ children }) => {
  return (
    <div className="flex border-gray-900 bg-gray-950 border rounded-md h-full">
      <SideNavbar />

      <div className="border-gray-900 bg-gray-900/[.55] border-l rounded-md w-full h-full">
        {children}
      </div>
    </div>
  );
};

SteperLayout.Form = Form;

export default SteperLayout;
