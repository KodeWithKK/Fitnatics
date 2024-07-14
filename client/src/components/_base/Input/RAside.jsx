// variant = solid, transparent

function RAside({ children, variant = "solid", className }) {
  return (
    <div
      className={`place-items-center grid px-2.5 rounded-l-[5px] rounded-r-[5px] h-full text-[15px] ${
        variant === "solid"
          ? "bg-gray-950 border-gray-900 border-l"
          : "text-inherit"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default RAside;
