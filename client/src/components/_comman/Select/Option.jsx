import { useContext, useEffect } from "react";
import { SelectContext } from "./Select";

const Option = ({ Icon, value, label }) => {
  const { commonClass, OptionClass, setValueLabelMap, onClickHandler } =
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
      className={`relative last:border-0 hover:bg-gray-800/[.75] px-2 py-1.5 border-b first:rounded-t-md last:rounded-b-md w-full text-[15px] text-left "border-gray-600/[.6] ${
        Icon && "pl-[38px]"
      } ${commonClass ?? ""} ${OptionClass ?? ""}`}
      onClick={() => onClickHandler(value)}
    >
      {Icon && (
        <Icon
          className={`top-[7px] left-2 absolute w-[22px] h-[22px] text-gray-500`}
        />
      )}

      <span>{label}</span>
    </button>
  );
};

export default Option;
