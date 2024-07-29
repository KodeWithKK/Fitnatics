import {
  useId,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";
import Options from "./Options";
import Option from "./Option";

export const SelectContext = createContext();

const Select = ({
  name,
  label,
  placeholder,
  commonClass,
  selectClass,
  OptionsClass,
  OptionClass,
  value,
  Icon,
  onChange,
  addBottomPadding,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [valueLabelMap, setValueLabelMap] = useState({});
  const [optionsHeight, setOptionsHeight] = useState("0");
  const optionsRef = useRef();
  const selectId = useId();

  const handleClick = useCallback(
    (value) => {
      onChange?.(value);
      setIsCollapsed(true);
    },
    [onChange],
  );

  useEffect(() => {
    const optionsRefElm = optionsRef.current;
    const height = optionsRefElm.offsetHeight;

    if (addBottomPadding && !isCollapsed) {
      setOptionsHeight(height);
    } else {
      setOptionsHeight("0");
    }
  }, [addBottomPadding, isCollapsed]);

  const contextValue = useMemo(() => {
    return {
      isCollapsed,
      commonClass,
      OptionsClass,
      OptionClass,
      setValueLabelMap,
      handleClick,
    };
  }, [isCollapsed, commonClass, OptionsClass, OptionClass, handleClick]);

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative" style={{ paddingBottom: `${optionsHeight}px` }}>
        <label
          htmlFor={selectId}
          className={`block text-sm text-gray-300 ${label ? "mb-1" : ""}`}
        >
          {label}
        </label>
        <button
          id={selectId}
          type="button"
          name={name}
          className={`relative mb-3 flex w-full items-center justify-between rounded-md border bg-gray-950 p-2 text-left text-[15px] ${
            Icon && "pl-[38px]"
          } ${
            !isCollapsed
              ? "border-brand ring-[2px] ring-brand"
              : "border-gray-600/[.6]"
          } ${commonClass ?? ""} ${selectClass ?? ""}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {Icon && (
            <Icon
              className={`absolute left-2 top-[9px] h-6 w-6 text-gray-500`}
            />
          )}

          {!value ? (
            <span className={"text-gray-700"}>
              {placeholder ?? "Select Option"}
            </span>
          ) : (
            <span className={"pr-2 text-gray-100"}>{valueLabelMap[value]}</span>
          )}

          <DownArrow
            className={`h-[15px] w-[15px] ${!isCollapsed && "rotate-180"}`}
          />
        </button>

        <Options ref={optionsRef}>{children}</Options>
      </div>
    </SelectContext.Provider>
  );
};

Select.Option = Option;

function DownArrow(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" {...props}>
      <path
        fill="currentColor"
        d="M104.704 338.752a64 64 0 0190.496 0l316.8 316.8 316.8-316.8a64 64 0 0190.496 90.496L557.248 791.296a64 64 0 01-90.496 0L104.704 429.248a64 64 0 010-90.496"
      />
    </svg>
  );
}

export default Select;
