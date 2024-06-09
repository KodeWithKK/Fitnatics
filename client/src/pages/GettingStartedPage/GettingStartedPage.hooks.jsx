import { useState, useMemo, useCallback } from "react";
import { produce } from "immer";
import { useQueryClient } from "@tanstack/react-query";

const memberNavItems = [
  { title: "Personal Details", description: "Enter your personal details" },
  { title: "Select a Gym", description: "Select a Gym" },
  { title: "Choose Plan", description: "Choose a membership plan" },
];

function useGettingStartedPagehooks() {
  const [step, setStep] = useState(1);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const [isFormRequestPending, setIsFormRequestPending] = useState(false);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({ member: {}, trainer: {} });

  const queryClient = useQueryClient();
  const fetchedUser = useMemo(
    () => queryClient.getQueryData(["user"]),
    [queryClient]
  );

  useMemo(() => {
    if (fetchedUser?.email) {
      setIsEmailVerified(true);
    }
  }, [fetchedUser]);

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
    fetchedUser,
    navItems: role === "member" ? memberNavItems : [],
    isEmailVerified,
    otpGeneratedAt,
    isFormRequestPending,
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setIsFormRequestPending,
    setMemberPersonalData,
    setMemberSelectedGym,
  };
}

export default useGettingStartedPagehooks;
