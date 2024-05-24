import { GoogleIcon } from "../Icons";

const GoogleAuthButton = ({ text }) => {
  const loginwithgoogle = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/login-google";
  };

  return (
    <button
      type="button"
      className="flex items-center border-2 border-gray-800 hover:bg-gray-800/[.3] px-3 py-2 rounded-l-md w-full"
      onClick={loginwithgoogle}
    >
      <GoogleIcon className="mr-2 h-6" />
      <span>{text}</span>
    </button>
  );
};

export default GoogleAuthButton;
