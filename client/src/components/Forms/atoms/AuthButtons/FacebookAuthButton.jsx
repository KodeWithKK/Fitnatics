import { FacebookIcon } from "../Icons";

const FacebookAuthButton = ({ text }) => {
  return (
    <button
      type="button"
      className="flex items-center border-2 border-gray-800 border-x-0 hover:bg-gray-800/[.3] px-3 py-2 w-full"
    >
      <FacebookIcon className="mr-2 h-6" />
      <span>{text}</span>
    </button>
  );
};

export default FacebookAuthButton;
