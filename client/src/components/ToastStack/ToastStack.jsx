import React from "react";
import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon,
} from "./Icons";

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
    </div>
  );
};

function Toast({ type, title, message, removeToast }) {
  const Icon = React.useMemo(() => IconMap[type], [type]);
  const colors = React.useMemo(() => getColors(type), [type]);

  return (
    <div
      className={`rounded-md bg-gray-950/[.85] border select-none animate-fadeLeftSlide ${colors.toastBorder}`}
    >
      <div
        className={`${colors.toastBg} flex items-center gap-3 w-[312px] p-2`}
      >
        <div
          className={`grid place-items-center w-10 h-10 ${colors.toastIconBg} rounded-full`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-[16px] text-gray-100">{title}</h2>
          <p className="text-gray-400 text-sm">{message}</p>
        </div>
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
  if (type === "success") {
    return {
      toastBorder: `border-green-900`,
      toastBg: `bg-green-900/[.1]`,
      toastIconBg: `bg-green-700`,
    };
  } else if (type === "info") {
    return {
      toastBorder: `border-blue-900`,
      toastBg: `bg-blue-900/[.1]`,
      toastIconBg: `bg-blue-700`,
    };
  } else if (type === "warning") {
    return {
      toastBorder: `border-yellow-900`,
      toastBg: `bg-yellow-900/[.1]`,
      toastIconBg: `bg-yellow-700`,
    };
  } else if (type === "error") {
    return {
      toastBorder: `border-red-900`,
      toastBg: `bg-red-900/[.1]`,
      toastIconBg: `bg-red-700`,
    };
  }
}

export default ToastStack;
