import { TwitterIcon } from "../Icons";

const TwitterAuthButton = ({ text }) => {
  return (
    <button
      type="button"
      className="flex items-center border-2 border-gray-800 hover:bg-gray-800/[.3] px-3 py-2 rounded-r-md w-full"
    >
      <TwitterIcon className="mr-2 h-6" />
      <span>{text}</span>
    </button>
  );
};

export default TwitterAuthButton;
