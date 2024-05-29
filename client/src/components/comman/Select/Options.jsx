import { useContext } from "react";
import { SelectContext } from "./Select";

const Options = ({ children }) => {
  const { commonClass, OptionsClass, isCollapsed } = useContext(SelectContext);

  return (
    <div
      className={`${
        isCollapsed && "hidden"
      } z-10 absolute -mt-1 border rounded-md w-full bg-gray-950 border-gray-600/[.6] ${
        commonClass ?? ""
      } ${OptionsClass ?? ""}`}
    >
      {children}
    </div>
  );
};

export default Options;
