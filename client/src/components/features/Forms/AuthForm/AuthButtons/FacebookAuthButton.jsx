const FacebookAuthButton = ({ text }) => {
  const loginwithfacebook = async () => {
    window.location.href = "http://localhost:8000/api/v1/auth/login-facebook";
  };

  return (
    <button
      type="button"
      className="flex items-center border-2 border-gray-800 border-x-0 hover:bg-gray-800/[.3] px-3 py-2 w-full"
      onClick={loginwithfacebook}
    >
      <FacebookIcon className="mr-2 h-6" />
      <span>{text}</span>
    </button>
  );
};

function FacebookIcon(props) {
  return (
    <svg
      viewBox="38.657999999999994 12.828 207.085 207.085"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
        fill="#3c5a9a"
      />
    </svg>
  );
}

export default FacebookAuthButton;
