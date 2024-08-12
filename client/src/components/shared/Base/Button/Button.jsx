import cn from "@utils/cn";

function Button({
  type = "button",
  className,
  variant = "primary",
  children,
  ...restProps
}) {
  return (
    <button
      type={type}
      className={cn(
        "px-3 py-1 text-[15px]",
        variant === "primary" && "rounded bg-brand/[.8] text-gray-100",
        variant === "secondary" && "rounded bg-gray-800 text-gray-200",
        variant === "outline" &&
          "rounded border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-975",
        variant === "text" &&
          "p-0 text-sm text-gray-300 underline underline-offset-[3px] hover:text-gray-100",
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button;
