import { useId, useRef, createContext } from "react";
import Options from "./Options";
import Option from "./Option";
import useSelectHooks from "./Select.hooks";
import cn from "@utils/cn";

import { DownArrow } from "./Icons";

export const SelectContext = createContext();

const Select = ({
  name,
  label,
  value,
  onChange,
  Icon,
  type = "text",
  error = "",
  placeholder,
  className,
  children,
}) => {
  const selectId = useId();
  const wrapperRef = useRef();
  const optionsRef = useRef();

  const {
    contextValue,
    isCollapsed,
    selectedValue,
    valueLabelMap,
    optionsPos,
    handleSelectClick,
  } = useSelectHooks({ value, type, onChange, optionsRef, wrapperRef });

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={wrapperRef} className={cn("w-full", className)}>
        <label
          htmlFor={selectId}
          className={cn("block text-sm text-gray-300", label && "mb-1")}
        >
          {label}
        </label>

        <div className="relative">
          <button
            id={selectId}
            type="button"
            name={name}
            className={cn(
              "flex w-full items-center justify-between rounded-md border bg-gray-950 p-2 text-left text-[15px]",
              isCollapsed && "border-gray-900/[.8]",
              !isCollapsed && "border-brand ring-1 ring-brand",
              error && "border-red-400",
              error && !isCollapsed && "ring-1 ring-red-400",
              Icon && "pl-[38px]",
            )}
            onClick={handleSelectClick}
          >
            {Icon && (
              <Icon
                className={`absolute left-2 top-[9px] h-6 w-6 text-gray-500`}
              />
            )}

            {selectedValue.length > 0 ? (
              <span className={"pr-2 text-gray-100"}>
                {type == "text" && valueLabelMap[selectedValue]}
                {type == "checkbox" &&
                  `${selectedValue.length} of ${Object.keys(valueLabelMap).length} Selected`}
              </span>
            ) : (
              <span className={"text-gray-700"}>
                {placeholder ?? "Select Option"}
              </span>
            )}

            <DownArrow
              className={cn("h-[15px] w-[15px]", !isCollapsed && "rotate-180")}
            />
          </button>

          <ErrorMessage>{error}</ErrorMessage>

          <Options ref={optionsRef} optionsPos={optionsPos}>
            {children}
          </Options>
        </div>
      </div>
    </SelectContext.Provider>
  );
};

function ErrorMessage({ children }) {
  if (!children) return null;
  return <p className={`mt-1 text-[15px] text-sm text-red-400`}>{children}</p>;
}

Select.Option = Option;

export default Select;
