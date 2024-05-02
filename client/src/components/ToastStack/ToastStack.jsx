import React from "react";
import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon,
} from "./Icons";

const ToastStack = () => {
  return (
    <div className="hidden fixed space-y-1 right-4 bottom-4">
      <Toast
        type="success"
        title="Success Message"
        message="This is a success Message"
      />
      <Toast
        type="error"
        title="Error Message"
        message="This is a error Message"
      />
      <Toast
        type="info"
        title="Info Message"
        message="This is a info Message"
      />
      <Toast
        type="warning"
        title="Warning Message"
        message="This is a warning Message"
      />
    </div>
  );
};

function Toast({ type, title, message }) {
  const Icon = React.useMemo(() => IconMap[type], [type]);

  return (
    <div
      className={`rounded-md bg-gray-950 border border-${colorMap[type]}-900 select-none`}
    >
      <div
        className={`bg-${colorMap[type]}-900/[.1] flex items-center gap-3 w-[312px] p-2`}
      >
        <div
          className={`grid place-items-center w-10 h-10 bg-${colorMap[type]}-700 rounded-full`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-gray-100">{title}</h2>
          <p className="text-pretty text-sm text-gray-400">{message}</p>
        </div>
        <button className="grid place-items-center w-10 h-10 rounded-md text-gray-50/[.25] hover:bg-gray-100/[.07]">
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

const colorMap = {
  success: "green",
  info: "blue",
  warning: "yellow",
  error: "red",
};

export default ToastStack;
