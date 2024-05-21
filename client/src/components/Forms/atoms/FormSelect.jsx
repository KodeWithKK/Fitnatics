import React from "react";

const FormSelect = ({
  label,
  currentValue,
  handleChange,
  children,
  className,
  ...delegated
}) => {
  const id = React.useId();

  return (
    <>
      <label
        className="block mb-0.5 text-[15px] text-gray-500 select-none"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        id={id}
        name="role"
        className={`w-full rounded-md bg-gray-950 border-gray-600/[.6] mb-4 focus:border-brand focus:ring-brand placeholder:text-gray-500/[.4] ${className}`}
        value={currentValue}
        onChange={handleChange}
        {...delegated}
      >
        {children}
      </select>
    </>
  );
};

export default FormSelect;
