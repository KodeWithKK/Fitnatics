import { RemoveScroll } from "react-remove-scroll";
import FocusLock from "react-focus-lock";

const Modal = () => {
  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className="fixed grid h-screen w-full place-items-center bg-gray-950/[.9]">
          <div className="w-[408px] rounded-md border border-gray-800 bg-gray-800/[.65] p-4">
            <h1 className="text-lg font-semibold tracking-wide text-gray-50">
              Session Expired!
            </h1>
            <p className="my-4 text-pretty text-gray-400">
              Your session for this account has been expired. Please sign in
              again.
            </p>
            <div className="flex gap-3">
              <button className="w-full rounded-md bg-gray-700/[.4] px-4 py-2">
                Sign out
              </button>
              <button className="w-full rounded-md bg-brand/[.8] px-4 py-2">
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
