const FacebookAuthButton = ({ text }) => {
  return (
    <a
      href="http://localhost:8000/api/v1/auth/login-facebook"
      className="flex w-full items-center border-2 border-x-0 border-gray-800 px-3 py-2 hover:bg-gray-800/[.3] max-sm:justify-center"
    >
      <FacebookIcon className="mr-2 h-6" />
      <span className="max-sm:hidden">{text}</span>
    </a>
  );
};

function FacebookIcon(props) {
  return (
    <svg
      viewBox="38.658 12.828 207.085 207.085"
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
