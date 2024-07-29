import { useContext, useEffect } from "react";
import { SelectContext } from "./Select";

const Option = ({ Icon, value, label }) => {
  const { commonClass, OptionClass, setValueLabelMap, handleClick } =
    useContext(SelectContext);

  useEffect(() => {
    setValueLabelMap((prevValue) => {
      const nextValue = { ...prevValue, [value]: label };
      return nextValue;
    });
  }, [value, label, setValueLabelMap]);

  return (
    <button
      type="button"
      className={`"border-gray-600/[.6] relative w-full border-b px-2 py-1.5 text-left text-[15px] first:rounded-t-md last:rounded-b-md last:border-0 hover:bg-gray-900 ${
        Icon && "pl-[38px]"
      } ${commonClass ?? ""} ${OptionClass ?? ""}`}
      onClick={() => handleClick(value)}
    >
      {Icon && (
        <Icon
          className={`absolute left-2 top-[7px] h-[22px] w-[22px] text-gray-500`}
        />
      )}

      <span>{label}</span>
    </button>
  );
};

export default Option;
