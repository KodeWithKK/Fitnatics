import { useMemo, createContext, useState, useCallback } from "react";
import { GenderIcon, ExperienceIcon } from "../Icons";

import Options from "./Options";
import Option from "./Option";

export const SelectContext = createContext();

const IconMap = {
  gender: GenderIcon,
  workoutExperience: ExperienceIcon,
};

const Select = ({
  name,
  placeholder,
  commonClass,
  selectClass,
  OptionsClass,
  OptionClass,
  value,
  onChange,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [valueTextMap, setValueTextMap] = useState({});
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  const Icon = useMemo(() => IconMap[name], [name]);

  const onClickHandler = useCallback(
    (value) => {
      onChange && onChange({ name, value });
      setSelectedValue(value);
      setIsCollapsed(true);
    },
    [name, onChange]
  );

  const memoValue = useMemo(() => {
    return {
      selectedValue,
      isCollapsed,
      commonClass,
      OptionsClass,
      OptionClass,
      setSelectedValue,
      setValueTextMap,
      onClickHandler,
    };
  }, [
    commonClass,
    OptionsClass,
    OptionClass,
    isCollapsed,
    selectedValue,
    onClickHandler,
  ]);

  return (
    <SelectContext.Provider value={memoValue}>
      <div className="relative">
        <button
          type="button"
          name={name}
          className={`relative flex text-[15px] justify-between items-center p-2 mb-3 rounded-md border text-left w-full bg-gray-950 ${
            Icon && "pl-[38px]"
          } ${
            !isCollapsed
              ? "ring-[2px] ring-brand border-brand"
              : "border-gray-600/[.6]"
          } ${commonClass ?? ""} ${selectClass ?? ""}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {Icon && (
            <Icon
              className={`top-[9px] left-2 absolute w-6 h-6 text-gray-500`}
            />
          )}

          {!selectedValue ? (
            <span className={"text-gray-700"}>
              {placeholder ?? "Select Option"}
            </span>
          ) : (
            <span className={"text-gray-100 pr-2"}>
              {valueTextMap[selectedValue]}
            </span>
          )}

          <DownArrow
            className={`w-[15px] h-[15px] ${!isCollapsed && "rotate-180"}`}
          />
        </button>

        {<Options>{children}</Options>}
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
