import { useState, useMemo, useContext, useEffect } from "react";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";
import SideNavbar from "./SideNavbar";
import Form from "./Form";
import { useQueryClient } from "@tanstack/react-query";

const memberNavItems = ["Personal Details", "Select a Gym", "Choose Plan"];

const SteperLayout = ({ children }) => {
  const [navItems, setNavItems] = useState([...memberNavItems]);
  const { step, setStep } = useContext(GettingStartedContext);
  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  useEffect(() => {
    if (user?.email) {
      setNavItems((prevNavItems) =>
        prevNavItems.filter((item) => item !== "Verify Email")
      );
    }
  }, [user]);

  return (
    <div className="flex border-gray-900 bg-gray-950 border rounded-md h-full">
      <SideNavbar currStep={step - 1} setStep={setStep} navItems={navItems} />

      <div className="border-gray-900 bg-gray-900/[.55] border-l rounded-md w-full h-full">
        {children}
      </div>
    </div>
  );
};

SteperLayout.Form = Form;

export default SteperLayout;
