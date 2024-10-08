function PDFIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        color="currentColor"
      >
        <path d="M3.5 13v-.804c0-2.967 0-4.45.469-5.636.754-1.905 2.348-3.407 4.37-4.118C9.595 2 11.168 2 14.318 2c1.798 0 2.698 0 3.416.253 1.155.406 2.066 1.264 2.497 2.353.268.677.268 1.525.268 3.22V13" />
        <path d="M3.5 12a3.333 3.333 0 013.333-3.333c.666 0 1.451.116 2.098-.057a1.67 1.67 0 001.179-1.18c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0113.5 2m-10 20v-3m0 0v-1.8c0-.566 0-.848.176-1.024C3.85 16 4.134 16 4.7 16h.8a1.5 1.5 0 010 3zm17-3H19c-.943 0-1.414 0-1.707.293S17 17.057 17 18v1m0 3v-3m0 0h2.5M14 19a3 3 0 01-3 3c-.374 0-.56 0-.7-.08-.333-.193-.3-.582-.3-.92v-4c0-.338-.033-.727.3-.92.14-.08.326-.08.7-.08a3 3 0 013 3" />
      </g>
    </svg>
  );
}

function CrossIcon(props) {
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
        d="M11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
      />
    </svg>
  );
}

export { PDFIcon, CrossIcon };
