import React from "react";
import { GoogleIcon } from "./Icons";

const GoogleAuthButton = () => {
  const loginwithgoogle = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/login-google";
  };

  return (
    <button
      type="button"
      className="flex items-center border-2 border-gray-700/[.6] hover:bg-gray-900 px-3 rounded-l-md w-full"
      onClick={loginwithgoogle}
    >
      <GoogleIcon className="mr-2 h-6" />
      <span>Google</span>
    </button>
  );
};

export default GoogleAuthButton;
