import React from "react";
import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon,
} from "./Icons";

const demoToast = {
  id: "1001",
  type: "info",
  title: "Something went wrong!",
  message: "Something went wrong while generating the tokens",
};

const ToastStack = ({ toasts, removeToast }) => {
  return (
    <div className="right-4 bottom-4 fixed space-y-3">
      {toasts?.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          removeToast={() => removeToast(toast.id)}
        />
      ))}

      {/* <Toast
        type={"info"}
        title={"OTP Resended!"}
        message={"A new OTP is sent to your email"}
        removeToast={() => removeToast(demoToast.id)}
      />

      <Toast
        type={"warning"}
        title={demoToast.title}
        message={demoToast.message}
        removeToast={() => removeToast(demoToast.id)}
      />

      <Toast
        type={"error"}
        title={"6 Digit OTP Required!"}
        message={"A 6 digit OTP is required for authentication"}
        removeToast={() => removeToast(demoToast.id)}
      />

      <Toast
        type={"success"}
        title={"Account Created!"}
        message={demoToast.message}
        removeToast={() => removeToast(demoToast.id)}
      /> */}
    </div>
  );
};

function Toast({ type, title, message, removeToast }) {
  const Icon = React.useMemo(() => IconMap[type], [type]);
  const colors = React.useMemo(() => getColors(type), [type]);

  return (
    <div
      className={`rounded-md bg-gray-975/[.9] border select-none animate-fadeLeftSlide ${colors.toastBorder}`}
    >
      {/* INNER CONTAINER */}
      <div
        className={`${colors.toastBg} flex items-center gap-3 w-[333px] p-2 px-2.5`}
      >
        {/* ICON */}
        <div
          className={`grid place-items-center w-10 h-10 ${colors.toastIconBg} rounded-full`}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          <h2 className="mb-1 font-semibold text-[16px] text-gray-200">
            {title}
          </h2>
          <p className={`${colors.textColor} text-[15px] leading-[1.4]`}>
            {message}
          </p>
        </div>

        {/* CLOSE BUTTON */}
        <button
          className="place-items-center grid hover:bg-gray-100/[.07] rounded-md w-10 h-10 text-gray-50/[.25]"
          onClick={removeToast}
        >
          <CloseIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

const IconMap = {
  success: CheckIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
};

// READ MORE about PurgeCSS error: https://v2.tailwindcss.com/docs/optimizing-for-production
function getColors(type) {
  if (type === "error") {
    return {
      toastBorder: `border-red-500`,
      toastBg: `bg-red-800/[.1]`,
      toastIconBg: `bg-red-500`,
      textColor: `text-[#938b8a]`,
    };
  } else if (type === "success") {
    return {
      toastBorder: `border-green-500/[.7]`,
      toastBg: `bg-green-800/[0.1]`,
      toastIconBg: `bg-green-500/[.7]`,
      textColor: `text-[#858e89]`,
    };
  } else if (type === "warning") {
    return {
      toastBorder: `border-yellow-500/[.7]`,
      toastBg: `bg-yellow-800/[.1]`,
      toastIconBg: `bg-yellow-500/[.7]`,
      textColor: `text-[#989690]`,
    };
  } else if (type === "info") {
    return {
      toastBorder: `border-blue-500`,
      toastBg: `bg-blue-800/[0.1]`,
      toastIconBg: `bg-blue-500`,
      textColor: `text-[#909398]`,
    };
  }
}

export default ToastStack;
