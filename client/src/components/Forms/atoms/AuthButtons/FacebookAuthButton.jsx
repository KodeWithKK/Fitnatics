import { FacebookIcon } from "../Icons";

const FacebookAuthButton = () => {
  const loginwithfb = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/login-google";
  };

  return (
    <button
      type="button"
      className="flex items-center border-2 border-gray-800 border-x-0 hover:bg-gray-800/[.3] px-3 w-full"
      onClick={loginwithfb}
    >
      <FacebookIcon className="mr-2 h-6" />
      <span>Facebook</span>
    </button>
  );
};

export default FacebookAuthButton;
