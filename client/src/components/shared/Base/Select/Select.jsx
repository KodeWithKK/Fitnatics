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
  placeholder,
  addBottomPadding,
  children,
}) => {
  const [selectedValue, setSelectedValue] = useState(() => {
    if (value) return value;
    return type === "checkbox" ? [] : "";
  });
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [valueLabelMap, setValueLabelMap] = useState({});
  const [optionsHeight, setOptionsHeight] = useState("0");
  const optionsRef = useRef();
  const selectId = useId();

  const handleClick = useCallback(
    (value) => {
      let nextValue = value;

      if (type === "checkbox") {
        if (selectedValue.includes(value)) {
          nextValue = selectedValue.filter((val) => val !== value);
        } else {
          nextValue = [...selectedValue, value];
        }
      }

      setSelectedValue(nextValue);
      if (type !== "checkbox") setIsCollapsed(true);
      onChange?.(nextValue);
    },
    [selectedValue, type, onChange],
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

  useEffect(() => {
    function hideOptions() {
      setIsCollapsed(true);
    }

    document.addEventListener("click", hideOptions);
    return () => document.removeEventListener("click", hideOptions);
  }, []);

  const contextValue = useMemo(() => {
    return {
      type,
      selectedValue,
      isCollapsed,
      setValueLabelMap,
      handleClick,
    };
  }, [type, isCollapsed, selectedValue, handleClick]);

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="" style={{ paddingBottom: `${optionsHeight}px` }}>
        <label
          htmlFor={selectId}
          className={cn("block text-sm text-gray-300", {
            "mb-1": label,
          })}
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
              Icon && "pl-[38px]",
              {
                "border-brand ring-[2px] ring-brand": !isCollapsed,
                "border-gray-900/[.8]": isCollapsed,
              },
            )}
            onClick={(event) => {
              event.stopPropagation();
              setIsCollapsed(!isCollapsed);
            }}
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

          <Options ref={optionsRef}>{children}</Options>
        </div>
      </div>
    </SelectContext.Provider>
  );
};

Select.Option = Option;

export default Select;
