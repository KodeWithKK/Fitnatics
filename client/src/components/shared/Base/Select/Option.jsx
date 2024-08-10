import { useContext, useEffect } from "react";
import { SelectContext } from "./Select";
import { CheckIcon } from "./Icons";

const Option = ({ Icon, value, label }) => {
  const { type, selectedValue, setValueLabelMap, handleClick } =
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
      className={`group relative flex w-full items-center border-b border-gray-900/[.8] px-2 py-1.5 text-left text-[15px] first:rounded-t-md last:rounded-b-md last:border-0 hover:bg-gray-900 ${
        Icon && "pl-[38px]"
      }`}
      onClick={(event) => {
        event.stopPropagation();
        handleClick(value);
      }}
    >
      {Icon && (
        <Icon
          className={`absolute left-2 top-[7px] h-[22px] w-[22px] text-gray-500`}
        />
      )}

      {type === "checkbox" && (
        <button
          type="button"
          className="mr-2 inline-grid h-6 w-6 place-items-center rounded bg-gray-975 group-hover:border-2 group-hover:border-gray-600"
        >
          {selectedValue.includes(value) && <CheckIcon className="h-4 w-4" />}
        </button>
      )}
      <span>{label}</span>
    </button>
  );
};

export default Option;
