import React from "react";
import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";

const Modal = () => {
  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className="fixed place-items-center grid bg-gray-950/[.9] w-full h-screen">
          <div className="border-gray-800 bg-gray-800/[.65] p-4 border rounded-md w-[408px]">
            <h1 className="font-semibold text-gray-50 text-lg tracking-wide">
              Session Expired!
            </h1>
            <p className="my-4 text-gray-400 text-pretty">
              Your session for this account has been expired. Please sign in
              again.
            </p>
            <div className="flex gap-3">
              <button className="bg-gray-700/[.4] px-4 py-2 rounded-md w-full">
                Sign out
              </button>
              <button className="bg-brand/[.8] px-4 py-2 rounded-md w-full">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
};

export default Modal;
