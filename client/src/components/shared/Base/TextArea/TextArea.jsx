import { useId, forwardRef } from "react";
import cn from "@utils/cn";

function TextArea({ label, error, disabled, className, ...restProps }, ref) {
  const taId = useId();

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-[15px] text-gray-300`} htmlFor={taId}>
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={ref}
          className={cn(
            "block w-full rounded-md border-gray-900/[.8] bg-gray-950 text-[15px] placeholder:text-gray-700 disabled:cursor-not-allowed",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400",
            !error && "focus:border-brand focus:ring-brand",
            disabled && "opacity-35",
            className,
          )}
          disabled={disabled}
          {...restProps}
          id={taId}
        />
      </div>

      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
}

function ErrorMessage({ children }) {
  return <p className={`mt-1 text-[15px] text-sm text-red-400`}>{children}</p>;
}

const ForwardedTextArea = forwardRef(TextArea);
export default ForwardedTextArea;
