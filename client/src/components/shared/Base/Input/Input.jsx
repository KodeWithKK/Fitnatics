import { useState, useRef, useEffect, forwardRef } from "react";
import Select from "../Select/Select";
import RAside from "./RAside";

import { EyeIcon, EyeSlashIcon } from "./Icons";

const Input = (
  {
    type,
    name,
    className,
    disabled,
    Icon,
    hasError = false,
    children,
    ...delegated
  },
  ref
) => {
  const [inputType, setInputType] = useState(type);
  const [inputPaddingRight, setInputPaddingRight] = useState(null);

  const childRef = useRef();

  useEffect(() => {
    const width = window
      .getComputedStyle(childRef.current)
      .getPropertyValue("width");

    if (width !== "0px") {
      setInputPaddingRight(`calc(${width} + 12px)`);
    }
  }, []);

  return (
    <div className="relative">
      <input
        ref={ref}
        className={`w-full text-[15px]  rounded-md bg-gray-950 border-gray-600/[.6] focus:border-brand focus:ring-brand placeholder:text-gray-700 disabled:cursor-not-allowed ${
          hasError
            ? "focus:border-red-400 focus:ring-red-400 border-red-400"
            : "focus:border-brand focus:ring-brand"
        } ${Icon && "pl-[38px]"} ${name === "password" && "pr-[42px]"} ${
          disabled && "opacity-35"
        } ${className}`}
        name={name}
        type={inputType}
        disabled={disabled}
        style={{ paddingRight: inputPaddingRight ? inputPaddingRight : "12px" }}
        {...delegated}
      />

      {Icon && (
        <Icon
          className={`top-[9px] left-2 absolute w-6 h-6 ${
            hasError ? "text-red-400" : "text-gray-500"
          }`}
        />
      )}

      {name === "password" && (
        <button
          type="button"
          className={`top-[5px] right-2 absolute p-1 rounded-full ${
            hasError
              ? "text-red-400 hover:bg-red-800/[.6]"
              : "text-gray-500 hover:bg-gray-800/[.7]"
          } disabled:cursor-not-allowed ${disabled && "hover:bg-gray-950"}`}
          onClick={() => {
            if (inputType === "password") {
              setInputType("text");
            } else {
              setInputType("password");
            }
          }}
          disabled={disabled}
        >
          {inputType == "password" && <EyeIcon className="w-6 h-6" />}
          {inputType == "text" && <EyeSlashIcon className="w-6 h-6" />}
        </button>
      )}

      <div
        ref={childRef}
        className={`top-px right-px absolute w-fit h-[40px] ${
          hasError ? "text-red-400" : "text-gray-500"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const ForwardedInput = forwardRef(Input);
ForwardedInput.Select = Select;
ForwardedInput.RAside = RAside;

export default ForwardedInput;
