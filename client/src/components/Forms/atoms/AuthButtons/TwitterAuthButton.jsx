import { TwitterIcon } from "../Icons";

const TwitterAuthButton = () => {
  const loginwithtwitter = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/login-google";
  };

  return (
    <button
      type="button"
      className="flex items-center border-2 border-gray-800 hover:bg-gray-800/[.3] px-3 rounded-r-md w-full"
      onClick={loginwithtwitter}
    >
      <TwitterIcon className="mr-2 h-6" />
      <span>Twitter</span>
    </button>
  );
};

export default TwitterAuthButton;
