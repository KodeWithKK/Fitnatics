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

function LeftArrowIcon(props) {
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

function HorizontalDivider(props) {
  return (
    <svg
      viewBox="408 231 23 3"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <ellipse
        cx={429.5}
        cy={232.5}
        rx={1.5}
        ry={1.5}
        transform="rotate(180 429.5 232.5)"
        fill="currentColor"
      />
      <ellipse
        cx={424.5}
        cy={232.5}
        rx={1.5}
        ry={1.5}
        transform="rotate(180 424.5 232.5)"
        fill="currentColor"
      />
      <ellipse
        cx={419.5}
        cy={232.5}
        rx={1.5}
        ry={1.5}
        transform="rotate(180 419.5 232.5)"
        fill="currentColor"
      />
      <ellipse
        cx={414.5}
        cy={232.5}
        rx={1.5}
        ry={1.5}
        transform="rotate(180 414.5 232.5)"
        fill="currentColor"
      />
      <ellipse
        cx={409.5}
        cy={232.5}
        rx={1.5}
        ry={1.5}
        transform="rotate(180 409.5 232.5)"
        fill="currentColor"
      />
    </svg>
  );
}

export { CheckIcon, LeftArrowIcon, HorizontalDivider };
