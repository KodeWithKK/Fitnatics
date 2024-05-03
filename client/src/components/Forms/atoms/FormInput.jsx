import React from "react";

const FormInput = ({ label, type, ...delegated }) => {
  const id = React.useId();

  return (
    <>
      <label
        className="block mb-0.5 text-[15px] text-gray-400 select-none"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-md bg-gray-950 border-gray-600/[.6] mb-4 focus:border-brand focus:ring-brand placeholder:text-gray-400/[.4]`}
        type={type}
        {...delegated}
      />
    </>
  );
};

export default FormInput;
