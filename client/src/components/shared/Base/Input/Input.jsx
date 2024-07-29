import { useId, useRef, useState, useEffect, forwardRef } from "react";
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
    error = "",
    label,
    children,
    ...delegated
  },
  ref,
) => {
  const [inputType, setInputType] = useState(type);
  const [inputPaddingRight, setInputPaddingRight] = useState(null);
  const inputId = useId();

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
    <div>
      <label
        htmlFor={inputId}
        className={`block text-sm text-gray-300 ${label ? "mb-1" : ""}`}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          className={`w-full rounded-md border-gray-600/[.6] bg-gray-950 text-[15px] placeholder:text-gray-700 focus:border-brand focus:ring-brand disabled:cursor-not-allowed ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400"
              : "focus:border-brand focus:ring-brand"
          } ${Icon ? "pl-[38px]" : ""} ${name === "password" ? "pr-[42px]" : ""} ${
            disabled ? "opacity-35" : ""
          } ${className}`}
          name={name}
          type={inputType}
          disabled={disabled}
          style={{ paddingRight: inputPaddingRight || "12px" }}
          {...delegated}
        />

        {Icon && (
          <Icon
            className={`absolute left-2 top-[9px] h-6 w-6 ${
              error ? "text-red-400" : "text-gray-500"
            }`}
          />
        )}

        {name === "password" && (
          <PasswordToggleBtn
            error={error}
            disabled={disabled}
            inputType={inputType}
            setInputType={setInputType}
          />
        )}

        <div
          ref={childRef}
          className={`absolute right-px top-px h-[40px] w-fit ${
            error ? "text-red-400" : "text-gray-500"
          }`}
        >
          {children}
        </div>
      </div>

      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

function ErrorMessage({ children }) {
  return (
    <p className={`mb-3 mt-1 text-[15px] text-sm text-red-400`}>{children}</p>
  );
}

function PasswordToggleBtn({ error, disabled, inputType, setInputType }) {
  return (
    <button
      type="button"
      className={`absolute right-2 top-[5px] rounded-full p-1 ${
        error
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
  );
}

const ForwardedInput = forwardRef(Input);
ForwardedInput.Select = Select;
ForwardedInput.RAside = RAside;

export default ForwardedInput;
