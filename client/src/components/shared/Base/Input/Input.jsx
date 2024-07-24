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
  ref,
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
        className={`w-full rounded-md border-gray-600/[.6] bg-gray-950 text-[15px] placeholder:text-gray-700 focus:border-brand focus:ring-brand disabled:cursor-not-allowed ${
          hasError
            ? "border-red-400 focus:border-red-400 focus:ring-red-400"
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
          className={`absolute left-2 top-[9px] h-6 w-6 ${
            hasError ? "text-red-400" : "text-gray-500"
          }`}
        />
      )}

      {name === "password" && (
        <button
          type="button"
          className={`absolute right-2 top-[5px] rounded-full p-1 ${
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
          {inputType == "password" && <EyeIcon className="h-6 w-6" />}
          {inputType == "text" && <EyeSlashIcon className="h-6 w-6" />}
        </button>
      )}

      <div
        ref={childRef}
        className={`absolute right-px top-px h-[40px] w-fit ${
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
