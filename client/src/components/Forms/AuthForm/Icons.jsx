function EmailIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5-8-5zm0 12H4V8l8 5 8-5z"
      />
    </svg>
  );
}

function PasswordIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 17a2 2 0 01-2-2c0-1.11.89-2 2-2a2 2 0 012 2 2 2 0 01-2 2m6 3V10H6v10zm0-12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 015-5 5 5 0 015 5v2zm-6-5a3 3 0 00-3 3v2h6V6a3 3 0 00-3-3"
      />
    </svg>
  );
}

function OtpIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M8 18l2-2h2l1.36-1.36a6.5 6.5 0 10-3.997-3.992L2 18v4h4l2-2z" />
        <circle cx={17} cy={7} r={1} />
      </g>
    </svg>
  );
}

export { EmailIcon, PasswordIcon, OtpIcon };
