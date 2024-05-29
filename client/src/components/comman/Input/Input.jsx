import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import OtpTimer from "@components/Forms/atoms/OtpTimer";
import Select from "../Select/Select";
import RAside from "./RAside";

import {
  EmailIcon,
  PasswordIcon,
  EyeIcon,
  EyeSlashIcon,
  OtpIcon,
  MemberIcon,
  PhoneIcon,
  DOBIcon,
  HeightIcon,
  WeightIcon,
} from "../Icons";

const IconMap = {
  email: EmailIcon,
  password: PasswordIcon,
  otp: OtpIcon,
  name: MemberIcon,
  phoneno: PhoneIcon,
  dob: DOBIcon,
  height: HeightIcon,
  weight: WeightIcon,
};

const Input = ({
  type,
  name,
  disabled,
  otpGeneratedAt,
  onInput,
  checkError,
  className,
  children,
  ...delegated
}) => {
  const Icon = useMemo(() => IconMap[name], [name]);
  const [inputType, setInputType] = useState(type);
  const [errorMessage, setErrorMessage] = useState(null);

  const inputRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    const width = window
      .getComputedStyle(childRef.current)
      .getPropertyValue("width");

    inputRef.current.style.paddingRight = `calc(${width} + 8px)`;
  }, []);

  const inputHandler = useCallback(
    async (e) => {
      onInput(e);
      const value = e.target.value;

      if (value.length === 0) {
        setErrorMessage(null);
      } else {
        const errorMessage = (await checkError(value)).errorMessage;
        setErrorMessage(errorMessage);
      }
    },
    [onInput, checkError]
  );

  return (
    <div className="relative">
      <input
        ref={inputRef}
        className={`w-full text-[15px]  rounded-md bg-gray-950 border-gray-600/[.6] focus:border-brand focus:ring-brand placeholder:text-gray-700 disabled:cursor-not-allowed ${
          errorMessage
            ? "focus:border-red-400 focus:ring-red-400 border-red-400"
            : "focus:border-brand focus:ring-brand"
        } ${Icon && "pl-[38px]"} ${name === "password" && "pr-[42px]"} ${
          disabled && "opacity-35"
        } ${className}`}
        name={name}
        type={inputType}
        onInput={inputHandler}
        disabled={disabled}
        {...delegated}
      />

      {Icon && (
        <Icon
          className={`top-[9px] left-2 absolute w-6 h-6 ${
            errorMessage ? "text-red-400" : "text-gray-500"
          }`}
        />
      )}

      {name === "password" && (
        <button
          type="button"
          className={`top-[5px] right-2 absolute p-1 rounded-full ${
            errorMessage
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

      {name === "otp" && (
        <OtpTimer
          className={`top-[9px] right-2 absolute text-[15px] select-none ${
            errorMessage ? "text-red-400" : "text-gray-500"
          }`}
          otpGeneratedAt={otpGeneratedAt}
        />
      )}

      <div ref={childRef} className="top-px right-px absolute w-fit h-[40px]">
        {children}
      </div>

      {/* STRANGE ERROR FIX: https://github.com/tailwindlabs/tailwindcss/discussions/10758?sort=new */}
      <p className="mt-1 mb-3 text-[#ee625d] text-sm transform-gpu">
        {errorMessage}
      </p>
    </div>
  );
};

Input.Select = Select;
Input.RAside = RAside;

export default Input;
