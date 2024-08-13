import { useMemo, useState, useEffect, useCallback } from "react";

function useSelectHooks({ value, type, onChange, optionsRef, wrapperRef }) {
  const [selectedValue, setSelectedValue] = useState(() => {
    if (value) return value;
    return type === "checkbox" ? [] : "";
  });
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [valueLabelMap, setValueLabelMap] = useState({});
  const [optionsPos, setOptionsPos] = useState("bottom");

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
    [optionsRef, wrapperRef, valueLabelMap, isCollapsed],
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

  return {
    contextValue,
    isCollapsed,
    selectedValue,
    valueLabelMap,
    optionsPos,
    handleSelectClick,
  };
}

function isNearBottom(wrapperRect, totalOption) {
  const windowHeight = window.innerHeight;
  let optionsPanelHeight = 37 * totalOption;
  if (optionsPanelHeight > 205) optionsPanelHeight = 205;
  const wrapperFullHeight = wrapperRect.height + optionsPanelHeight + 12;
  return wrapperRect.top + wrapperFullHeight + 20 > windowHeight;
}

export default useSelectHooks;
