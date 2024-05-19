import React from "react";

const LoadingScreen = () => {
  return (
    <div className="place-items-center grid bg-gray-950 w-full h-screen">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner className="drop-shadow-[0_0px_5px_#1472ff] w-12 h-12 text-brand animate-spin" />
        <h3 className="text-gray-100 text-lg">Loading...</h3>
      </div>
    </div>
  );
};

function LoadingSpinner(props) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 5.416c8.054 0 14.583 6.529 14.583 14.583a14.52 14.52 0 01-2.319 7.894 1.25 1.25 0 11-2.1-1.355A12.02 12.02 0 0032.083 20c0-6.673-5.41-12.083-12.084-12.083a1.25 1.25 0 010-2.5zm-8.733 24.74a1.25 1.25 0 011.743-.297 12.084 12.084 0 0013.032.604 1.25 1.25 0 111.25 2.166 14.584 14.584 0 01-15.727-.73 1.25 1.25 0 01-.298-1.742zm-3.35-9.935a1.25 1.25 0 10-2.5.044c.042 2.45.702 4.858 1.954 7.026a1.25 1.25 0 102.165-1.25 12.022 12.022 0 01-1.62-5.82z"
        fill="currentColor"
      />
    </svg>
  );
}

export default LoadingScreen;
