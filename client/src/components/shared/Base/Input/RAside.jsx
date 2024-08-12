import cn from "@utils/cn";
// variant = solid, transparent

function RAside({ children, variant = "solid", className }) {
  return (
    <div
      className={cn(
        "grid h-full place-items-center rounded-l-[5px] rounded-r-[5px] px-2.5 text-[15px]",
        variant === "solid" && "border-l border-gray-900 bg-gray-950",
        variant !== "solid" && "text-inherit",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default RAside;
