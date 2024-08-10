function DownArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
      <path
        fill="currentColor"
        d="M104.704 338.752a64 64 0 0190.496 0l316.8 316.8 316.8-316.8a64 64 0 0190.496 90.496L557.248 791.296a64 64 0 01-90.496 0L104.704 429.248a64 64 0 010-90.496"
      />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.75 8.75l3.5 3.5 7-7.5"
      />
    </svg>
  );
}

export { DownArrow, CheckIcon };
