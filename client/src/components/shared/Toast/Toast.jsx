import React from "react";

import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon,
} from "./Icons";

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
        <ToastIcon bgColor={colors.toastIconBg} Icon={Icon} />

        <ToastMainContent
          titleColor={colors.titleColor}
          title={title}
          mssgColor={colors.mssgColor}
          message={message}
        />

        <ToastCloseButton onClickHandler={removeToast} />
      </div>
    </div>
  );
}

function ToastIcon({ bgColor, Icon }) {
  return (
    <div
      className={`grid place-items-center w-10 h-10 ${bgColor} rounded-full`}
    >
      <Icon className="w-6 h-6" />
    </div>
  );
}

function ToastMainContent({ titleColor, title, mssgColor, message }) {
  return (
    <div className="flex-1 space-y-1">
      {title && (
        <h2 className={`font-semibold text-[16px] ${titleColor}`}>{title}</h2>
      )}
      <p className={`${mssgColor} text-[15px] leading-[1.4]`}>{message}</p>
    </div>
  );
}

function ToastCloseButton({ onClickHandler }) {
  return (
    <button
      className="place-items-center grid hover:bg-gray-100/[.07] rounded-md w-10 h-10 text-gray-50/[.25]"
      onClick={onClickHandler}
    >
      <CloseIcon className="w-3.5 h-3.5" />
    </button>
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
      mssgColor: `text-red-50/[.75]`,
      titleColor: `text-red-500`,
    };
  } else if (type === "success") {
    return {
      toastBorder: `border-green-600`,
      toastBg: `bg-green-800/[0.1]`,
      toastIconBg: `bg-green-600`,
      mssgColor: `text-green-50/[.75]`,
      titleColor: `text-green-600`,
    };
  } else if (type === "warning") {
    return {
      toastBorder: `border-yellow-500`,
      toastBg: `bg-yellow-800/[.1]`,
      toastIconBg: `bg-yellow-500`,
      mssgColor: `text-yellow-50/[.75]`,
      titleColor: `text-yellow-500`,
    };
  } else if (type === "info") {
    return {
      toastBorder: `border-blue-500`,
      toastBg: `bg-blue-800/[0.1]`,
      toastIconBg: `bg-blue-500`,
      mssgColor: `text-blue-50/[.75]`,
      titleColor: `text-blue-500`,
    };
  }
}

export default Toast;
