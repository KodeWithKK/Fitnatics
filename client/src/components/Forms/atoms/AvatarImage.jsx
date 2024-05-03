import React from "react";

function AvatarImage({ className, ...delegated }, ref) {
  return (
    <div
      className={`w-[120px] h-[120px] overflow-hidden rounded-full bg-gray-600 ${className}`}
      {...delegated}
    >
      <input
        ref={ref}
        className="hidden w-full h-full"
        type="file"
        accept=".png, .jpg, .jpeg"
      />
      <AvatarIcon className="border w-full h-full scale-[1.05]" />
    </div>
  );
}

function AvatarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="297.844 160.844 52.313 52.313"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M324 160.844c-14.449 0-26.156 11.707-26.156 26.156 0 14.449 11.707 26.156 26.156 26.156 14.449 0 26.156-11.707 26.156-26.156 0-14.449-11.707-26.156-26.156-26.156zm0 10.125a9.28 9.28 0 019.281 9.281 9.28 9.28 0 01-9.281 9.281 9.28 9.28 0 01-9.281-9.281 9.28 9.28 0 019.281-9.281zm0 36.281c-6.191 0-11.739-2.805-15.451-7.193 1.983-3.734 5.864-6.307 10.389-6.307.253 0 .506.042.748.116 1.371.443 2.806.728 4.314.728s2.953-.285 4.314-.728c.242-.074.495-.116.749-.116 4.524 0 8.405 2.573 10.388 6.307-3.712 4.388-9.26 7.193-15.451 7.193z"
        fill="#09090b"
        className=""
      />
    </svg>
  );
}

const ForwardedAvatarImage = React.forwardRef(AvatarImage);
export default ForwardedAvatarImage;
