import { useContext, useEffect } from "react";
import { SelectContext } from "./Select";

const Option = ({ value, Icon, children }) => {
  const { commonClass, OptionClass, setValueTextMap, onClickHandler } =
    useContext(SelectContext);

  useEffect(() => {
    setValueTextMap((prevValue) => {
      const nextValue = { ...prevValue, [value]: children };
      return nextValue;
    });
  }, [value, children, setValueTextMap]);

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

      <span>{children}</span>
    </button>
  );
};

export default Option;
