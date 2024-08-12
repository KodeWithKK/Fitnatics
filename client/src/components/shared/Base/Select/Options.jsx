import { forwardRef, useContext } from "react";
import cn from "@utils/cn";
import { SelectContext } from "./Select";

const Options = ({ optionsPos, children }, ref) => {
  const { isCollapsed } = useContext(SelectContext);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 z-10 -mt-1 max-h-[205px] w-full overflow-y-auto rounded-md border border-gray-900/[.8] bg-gray-950",
        optionsPos === "bottom" && "top-[54px]",
        optionsPos === "top" && "bottom-[54px]",
        isCollapsed && "hidden",
      )}
    >
      {children}
    </div>
  );
};

const ForwardedOptions = forwardRef(Options);
export default ForwardedOptions;
