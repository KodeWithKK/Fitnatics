import { useState, useMemo, useCallback } from "react";
import { produce } from "immer";

function useGettingStartedPagehooks() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({ member: {}, trainer: {} });

  const memberPersonalData = useMemo(
    () => data.member?.personalDetails,
    [data]
  );

  const setMemberPersonalData = useCallback(
    (formData) => {
      const nextData = produce(data, (draftState) => {
        draftState.member.personalDetails = { ...formData };
      });
      setData(nextData);
    },
    [data]
  );

  const memberSelectedGym = useMemo(() => data.member?.gymLocation, [data]);

  const setMemberSelectedGym = useCallback(
    (value) => {
      const nextData = produce(data, (draftState) => {
        draftState.member.gymLocation = value;
      });
      setData(nextData);
    },
    [data]
  );

  return {
    step,
    role,
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setMemberPersonalData,
    setMemberSelectedGym,
  };
}

export default useGettingStartedPagehooks;
