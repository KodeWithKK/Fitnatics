import { useMemo, createContext, useContext, useState, useEffect } from "react";
import {
  GenderIcon,
  MaleIcon,
  FemaleIcon,
  BeginnerIcon,
  IntermediateIcon,
  AdvancedIcon,
  ExperienceIcon,
} from "../Icons";

const SelectContext = createContext();

const IconMap = {
  gender: GenderIcon,
  male: MaleIcon,
  female: FemaleIcon,
  beginner: BeginnerIcon,
  intermediate: IntermediateIcon,
  advanced: AdvancedIcon,
  workoutExperience: ExperienceIcon,
};

const Select = ({ name, placeholder, borderColor, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [nameValueMap, setNameValueMap] = useState({});
  const [selectedValue, setSelectedValue] = useState("");

  const Icon = useMemo(() => IconMap[name], [name]);

  const value = useMemo(() => {
    return {
      selectedValue,
      borderColor,
      setSelectedValue,
      setNameValueMap,
      setIsCollapsed,
    };
  }, [borderColor, selectedValue]);

  return (
    <SelectContext.Provider value={value}>
      <div className="relative">
        <button
          type="button"
          name={name}
          className={`relative flex text-[15px] justify-between items-center border-gray-600/[.6] bg-gray-950 p-2 mb-3 border rounded-md text-left w-full ${borderColor} ${
            Icon && "pl-[38px]"
          } ${!isCollapsed && "ring-[1px] ring-brand border-brand"}`}
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
            <span className={"text-gray-100"}>
              {nameValueMap[selectedValue]}
            </span>
          )}

          <DownArrow
            className={`w-[15px] h-[15px] ${!isCollapsed && "rotate-180"}`}
          />
        </button>

        {!isCollapsed && <Options>{children}</Options>}
      </div>
    </SelectContext.Provider>
  );
};

const Options = ({ children }) => {
  const { borderColor } = useContext(SelectContext);

  return (
    <div
      className={`z-10 absolute border-gray-600/[.6] bg-gray-950 -mt-1 border rounded-md w-full ${borderColor}`}
    >
      {children}
    </div>
  );
};

const Option = ({ value, children }) => {
  const Icon = useMemo(() => IconMap[value], [value]);
  const { borderColor, setNameValueMap, setSelectedValue, setIsCollapsed } =
    useContext(SelectContext);

  useEffect(() => {
    setNameValueMap((prevValue) => {
      const nextValue = { ...prevValue, [value]: children };
      return nextValue;
    });
  }, [setNameValueMap, value, children]);

  return (
    <button
      type="button"
      className={`relative border-gray-600/[.6] last:border-0 hover:bg-gray-800/[.75] px-2 py-1.5 border-b first:rounded-t-md last:rounded-b-md w-full text-[15px] text-left ${borderColor} ${
        Icon && "pl-[38px]"
      }`}
      onClick={() => {
        setSelectedValue(value);
        setIsCollapsed(true);
      }}
    >
      {Icon && (
        <Icon
          className={`top-[7px] left-2 absolute w-[22px] h-[22px] text-gray-500`}
        />
      )}

      <span>{children}</span>
    </button>
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
