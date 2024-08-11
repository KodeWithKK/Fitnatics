import { forwardRef, useContext } from "react";
import { SelectContext } from "./Select";

const Options = ({ children }, ref) => {
  const { isCollapsed } = useContext(SelectContext);

  return (
    <div
      ref={ref}
      className={`${
        isCollapsed && "hidden"
      } absolute left-0 top-[54px] z-10 -mt-1 max-h-[205px] w-full overflow-y-auto rounded-md border border-gray-900/[.8] bg-gray-950`}
    >
      {children}
    </div>
  );
};

const ForwardedOptions = forwardRef(Options);
export default ForwardedOptions;
