import React from "react";

function AvatarImage({ className, handleAvatarInput }, ref) {
  const [file, setFile] = React.useState(null);

  const handleChange = React.useCallback((e) => {
    console.log(e.target.files[0].size / 1024 + " KB");
    const nextFile = URL.createObjectURL(e.target.files[0]);
    setFile(nextFile);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div
          className={`w-[120px] h-[120px] overflow-hidden rounded-full bg-gray-600 cursor-pointer ${className}`}
          onClick={handleAvatarInput}
        >
          <input
            ref={ref}
            className="hidden w-full h-full"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
          />

          {file && (
            <img
              src={file}
              className="w-full h-full object-center object-cover"
            />
          )}
          {!file && (
            <AvatarIcon className="border w-full h-full scale-[1.05]" />
          )}
        </div>

        <div
          className="top-[102px] -right-1 absolute bg-gray-800 p-3 rounded-full cursor-pointer"
          onClick={handleAvatarInput}
        >
          <PlusIcon className="w-5 h-5" />
        </div>
      </div>
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

function PlusIcon(props) {
  return (
    <svg
      viewBox="379 322 10 10"
      style={{
        WebkitPrintColorAdjust: ":exact",
      }}
      fill="none"
      {...props}
    >
      <path
        d="M384.75 322.75a.75.75 0 00-1.5 0v3.5h-3.5a.75.75 0 000 1.5h3.5v3.5a.75.75 0 001.5 0v-3.5h3.5a.75.75 0 000-1.5h-3.5v-3.5z"
        fill="currentColor"
        className=""
      />
    </svg>
  );
}

const ForwardedAvatarImage = React.forwardRef(AvatarImage);
export default ForwardedAvatarImage;
