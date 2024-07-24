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
          className={`h-[120px] w-[120px] cursor-pointer overflow-hidden rounded-full bg-gray-600 ${className}`}
          onClick={handleAvatarInput}
        >
          <input
            ref={ref}
            className="hidden h-full w-full"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
          />

          {file && (
            <img
              src={file}
              className="h-full w-full object-cover object-center"
            />
          )}
          {!file && (
            <AvatarIcon className="h-full w-full scale-[1.05] border" />
          )}
        </div>

        <div
          className="absolute -right-1.5 top-[102px] cursor-pointer rounded-full bg-gray-800 p-2.5"
          onClick={handleAvatarInput}
        >
          <PlusIcon className="h-5 w-5" />
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
