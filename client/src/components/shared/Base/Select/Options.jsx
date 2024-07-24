import { forwardRef, useContext } from "react";
import { SelectContext } from "./Select";

const Options = ({ children }, ref) => {
  const { commonClass, OptionsClass, isCollapsed } = useContext(SelectContext);

  return (
    <div
      ref={ref}
      className={`${
        isCollapsed && "hidden"
      } absolute z-10 -mt-1 w-full rounded-md border border-gray-600/[.6] bg-gray-950 ${
        commonClass ?? ""
      } ${OptionsClass ?? ""}`}
    >
      {children}
    </div>
  );
};

const ForwardedOptions = forwardRef(Options);
export default ForwardedOptions;
