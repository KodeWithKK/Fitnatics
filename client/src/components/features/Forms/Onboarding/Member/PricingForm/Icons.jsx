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
      <path d="M421 177.611l4.923 4.889 11.077-11" strokeLinejoin="round" />
      <g fill="none" strokeLinejoin="round" className="strokes">
        <path
          d="M421 177.611l4.923 4.889 11.077-11"
          fillOpacity="none"
          strokeWidth={2.5}
          stroke="currentColor"
        />
      </g>
    </svg>
  );
}

function LeftMoveIcon(props) {
  return (
    <svg
      viewBox="233 278 9 16"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M241.707 278.293a.999.999 0 010 1.414L235.414 286l6.293 6.293a.999.999 0 11-1.414 1.414l-7-7a.997.997 0 010-1.414l7-7a.999.999 0 011.414 0z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
}

export { CheckIcon, LeftMoveIcon };
