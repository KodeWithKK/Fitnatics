import { useRef, useState, useEffect, useCallback } from "react";
import { AvatarIcon, PlusIcon } from "./Icons";

function AvatarImage({ height, width, file, onChange }) {
  const [fileURL, setFileURL] = useState(null);
  const avatarRef = useRef();

  useEffect(() => {
    const url = file && URL.createObjectURL(file);
    url && setFileURL(url);
  }, [file]);

  const handleChange = useCallback(
    (e) => {
      const nextFile = e.target.files[0];
      onChange(nextFile);
    },
    [onChange],
  );

  const handleAvatarInput = useCallback(() => {
    avatarRef.current.click();
  }, []);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className={`h-[180px] w-[180px] overflow-hidden rounded-full bg-gray-600`}
        style={{ height, width }}
        onClick={handleAvatarInput}
      >
        <input
          ref={avatarRef}
          className="hidden h-full w-full"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleChange}
        />

        {fileURL && (
          <img
            src={fileURL}
            className="h-full w-full object-cover object-center"
            alt="avtar-logo"
          />
        )}
        {!fileURL && (
          <AvatarIcon className="h-full w-full scale-[1.05] border" />
        )}
      </button>

      <PlusButton
        handleAvatarInput={handleAvatarInput}
        width={width}
        height={height}
      />
    </span>
  );
}

function PlusButton({ handleAvatarInput, width, height }) {
  return (
    <button
      type="button"
      className="absolute -right-[2.7%] bottom-[2%] rounded-full bg-gray-800 p-2.5"
      draggable="true"
      onClick={handleAvatarInput}
    >
      <PlusIcon
        className="h-[calc(180px/6.5)] w-[calc(180px/6.5)]"
        style={
          width &&
          height && {
            width: `calc(${width} / 6.5)`,
            height: `calc(${height} / 6.5`,
          }
        }
      />
    </button>
  );
}

export default AvatarImage;
