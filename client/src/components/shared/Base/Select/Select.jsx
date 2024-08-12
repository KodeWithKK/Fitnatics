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
  children,
}) => {
  const [selectedValue, setSelectedValue] = useState(() => {
    if (value) return value;
    return type === "checkbox" ? [] : "";
  });
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [valueLabelMap, setValueLabelMap] = useState({});
  const [optionsPos, setOptionsPos] = useState("bottom");
  const wrapperRef = useRef();
  const optionsRef = useRef();
  const selectId = useId();

  const handleSelectClick = useCallback(
    (event) => {
      event.stopPropagation();
      setIsCollapsed(!isCollapsed);
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const totalOption = Object.keys(valueLabelMap).length;
      if (isNearBottom(wrapperRect, totalOption)) {
        setOptionsPos("top");
        optionsRef.current.scrollIntoView({
          block: "nearest",
          inline: "start",
        });
      } else {
        setOptionsPos("bottom");
      }
    },
    [valueLabelMap, isCollapsed],
  );

  const handleOptionClick = useCallback(
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
      handleOptionClick,
    };
  }, [type, isCollapsed, selectedValue, handleOptionClick]);

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={wrapperRef}>
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
              !isCollapsed && "border-brand ring-[2px] ring-brand",
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

          <Options ref={optionsRef} optionsPos={optionsPos}>
            {children}
          </Options>
        </div>
      </div>
    </SelectContext.Provider>
  );
};

function isNearBottom(wrapperRect, totalOption) {
  const windowHeight = window.innerHeight;
  let optionsPanelHeight = 37 * totalOption;
  if (optionsPanelHeight > 205) optionsPanelHeight = 205;
  const wrapperFullHeight = wrapperRect.height + optionsPanelHeight + 12;
  return wrapperRect.top + wrapperFullHeight + 20 > windowHeight;
}

Select.Option = Option;

export default Select;
