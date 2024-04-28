import React from "react";

const FormInput = ({ label, type, ...delegated }) => {
  const id = React.useId();

  return (
    <>
      <label
        className="block text-gray-400 text-[15px] mb-0.5 select-none"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-md bg-gray-950 border-gray-600/[.6] mb-4 placeholder:text-gray-400/[.4]`}
        type={type}
        {...delegated}
      />
    </>
  );
};

export default FormInput;
