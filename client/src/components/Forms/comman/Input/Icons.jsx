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

function EyeIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 000 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 000-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0125 128a133.3 133.3 0 0123.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 01231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1048 48 48.05 48.05 0 00-48-48m0 80a32 32 0 1132-32 32 32 0 01-32 32"
      />
    </svg>
  );
}

function EyeSlashIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M53.92 34.62a8 8 0 10-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 000 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.1 127.1 0 0052.07-10.83l22 24.21a8 8 0 1011.84-10.76zm47.33 75.84l41.67 45.85a32 32 0 01-41.67-45.85M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.2 133.2 0 0125 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0063.66 70l14.73 16.2A112 112 0 01128 192m6-95.43a8 8 0 013-15.72 48.16 48.16 0 0138.77 42.64 8 8 0 01-7.22 8.71 6 6 0 01-.75 0 8 8 0 01-8-7.26A32.09 32.09 0 00134 96.57m113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 11-10.67-11.92 132.8 132.8 0 0027.8-35.14 133.2 133.2 0 00-23.12-30.77C185.67 75.19 158.78 64 128 64a118.4 118.4 0 00-19.36 1.57A8 8 0 11106 49.79 134 134 0 01128 48c34.88 0 66.57 13.26 91.66 38.35 18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 010 6.5z"
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

export { EmailIcon, PasswordIcon, EyeIcon, EyeSlashIcon, OtpIcon };
