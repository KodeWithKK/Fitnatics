import { useState, useCallback } from "react";

function useSetupAccountPagehooks() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({});

  const addData = useCallback(
    ({ name, value }) => {
      setData((prevData) => {
        if (typeof value === "object") {
          const nextData = {
            ...prevData,
            [role]: { ...prevData[role], ...value },
          };
          return nextData;
        } else if (typeof value === "string") {
          const nextData = {
            ...prevData,
            [role]: { ...prevData[role], [name]: value },
          };
          return nextData;
        }
        return prevData;
      });
    },
    [role]
  );

  return { step, role, data, setStep, setRole, addData };
}

export default useSetupAccountPagehooks;
