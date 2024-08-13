import { useId, useRef, useState, useEffect, forwardRef } from "react";
import cn from "@utils/cn";
import Select from "../Select/Select";
import RAside from "./RAside";

import { EyeIcon, EyeSlashIcon } from "./Icons";

const Input = (
  {
    type,
    name,
    className,
    borderColor,
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
    <div className="w-full">
      <label
        htmlFor={inputId}
        className={cn("block text-sm text-gray-300", label && "mb-1")}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-md bg-gray-950 text-[15px] placeholder:text-gray-700 disabled:cursor-not-allowed",
            disabled && "opacity-35",
            name === "password" && "pr-[42px]",
            borderColor ?? "border-gray-900/[.8]",
            Icon && "pl-[38px]",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400",
            !error && "focus:border-brand focus:ring-brand",
            className,
          )}
          name={name}
          type={inputType}
          disabled={disabled}
          style={{ paddingRight: inputPaddingRight }}
          {...delegated}
        />

        {Icon && (
          <Icon
            className={cn(
              "absolute left-2 top-[9px] h-6 w-6",
              error && "text-red-400",
              !error && "text-gray-500",
            )}
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
          className={cn(
            "absolute right-px top-px h-[40px] w-fit",
            error && "text-red-400",
            !error && "text-gray-500",
          )}
        >
          {children}
        </div>
      </div>

      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

function ErrorMessage({ children }) {
  if (!children) return null;
  return <p className={`mt-1 text-[15px] text-sm text-red-400`}>{children}</p>;
}

function PasswordToggleBtn({ error, disabled, inputType, setInputType }) {
  return (
    <button
      type="button"
      className={cn(
        "absolute right-2 top-[5px] rounded-full p-1 disabled:cursor-not-allowed",
        error && "text-red-400 hover:bg-red-800/[.6]",
        !error && "text-gray-500 hover:bg-gray-800/[.7]",
        disabled && "hover:bg-gray-950",
      )}
      onClick={() => {
        if (inputType === "password") setInputType("text");
        else setInputType("password");
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
