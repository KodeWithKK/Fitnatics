function CheckIcon(props) {
  return (
    <svg
      viewBox="418 168.5 22 17"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M421 177.611l4.923 4.889 11.077-11"
        strokeLinejoin="round"
        className=""
      />
      <g fill="none" strokeLinejoin="round" className="strokes">
        <path
          d="M421 177.611l4.923 4.889 11.077-11"
          fillOpacity="none"
          strokeWidth={2.5}
          stroke="currentColor"
          className=""
        />
      </g>
    </svg>
  );
}

function ErrorIcon(props) {
  return (
    <svg
      viewBox="509 205 12 12"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path d="M519 207l-8 8m0-8l8 8" strokeLinejoin="round" className="" />
      <g fill="none" strokeLinejoin="round" className="strokes">
        <path
          d="M519 207l-8 8m0-8l8 8"
          fillOpacity="none"
          strokeWidth={1.3}
          stroke="currentColor"
          className=""
        />
      </g>
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg
      viewBox="339.702 320.713 10.585 10.585"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M339.995 321.006a1 1 0 000 1.415l3.585 3.585-3.585 3.585a.999.999 0 101.414 1.414l3.585-3.585 3.585 3.585a1 1 0 101.415-1.414l-3.586-3.585 3.586-3.585c.39-.391.39-1.024 0-1.415a1.002 1.002 0 00-1.415 0l-3.585 3.585-3.585-3.585a1 1 0 00-1.414 0z"
        fill="currentColor"
        className=""
      />
    </svg>
  );
}

function WarningIcon(props) {
  return (
    <svg
      viewBox="423.172 258.638 2.656 15.675"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M425.828 272.984a1.33 1.33 0 01-2.267.94 1.328 1.328 0 112.267-.94zm-1.328-2.74a1.03 1.03 0 01-1.03-1.03v-9.546a1.03 1.03 0 112.06 0v9.548a1.03 1.03 0 01-1.03 1.028z"
        fill="currentColor"
        className=""
      />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      viewBox="446 309 3.5 16"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M448 312a1.5 1.5 0 10-.001-3.001A1.5 1.5 0 00448 312zm-1 2a1 1 0 000 2v8a1 1 0 002 0v-9a1 1 0 00-1-1h-1z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        className=""
      />
    </svg>
  );
}

export { CheckIcon, ErrorIcon, WarningIcon, InfoIcon, CloseIcon };
