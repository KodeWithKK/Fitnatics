import { useCallback, useId, useRef, useState } from "react";
import { PDFIcon, CrossIcon } from "./Icons";

// Accept Ref: https://stackoverflow.com/questions/4328947/limit-file-format-when-using-input-type-file

function FileUpload({ value, onChange, label, accept }) {
  const [file, setFile] = useState(value);
  const fileId = useId();
  const fileRef = useRef();

  const handleClick = useCallback(() => {
    fileRef.current.click();
  }, []);

  const handleChange = useCallback(
    (e) => {
      const nextFile = e.target.files[0];
      setFile(nextFile);
      onChange?.(nextFile);
    },
    [onChange],
  );

  const handleRemove = useCallback(() => {
    fileRef.current.value = null;
    setFile(null);
    onChange?.(null);
  }, [onChange]);

  return (
    <div>
      {label && (
        <label htmlFor={fileId} className="mb-1 block text-sm text-gray-300">
          {label}
        </label>
      )}

      {file && (
        <div className="mb-3 flex items-center gap-2 rounded border border-gray-900/[.8] bg-gray-950 p-2 text-[15px] text-gray-100">
          <div>
            <PDFIcon className={"text-[32px]"} />
          </div>

          <div className="flex-1">
            <p className="">{file.name}</p>
            <div className="text-sm text-gray-600">
              {formatFileSize(file.size)}
            </div>
          </div>

          <button
            type="button"
            className="ml-auto grid h-8 w-8 place-items-center rounded-md hover:bg-gray-900"
            onClick={handleRemove}
          >
            <CrossIcon className="text-[28px] text-gray-600" />
          </button>
        </div>
      )}

      {!file && (
        <button
          type="button"
          className="rounded bg-gray-800/[.8] px-2 py-1 text-gray-200"
          onClick={handleClick}
        >
          Choose File
        </button>
      )}

      <input
        id={fileId}
        ref={fileRef}
        className="hidden"
        type="file"
        onChange={handleChange}
        accept={accept}
      />
    </div>
  );
}

function formatFileSize(size) {
  const sizeInKB = (size / 1024).toFixed(2);
  if (sizeInKB < 1024) return sizeInKB + " KB";
  const sizeInMB = (size / 1024 / 1024).toFixed(2);
  return sizeInMB + " MB";
}

export default FileUpload;
