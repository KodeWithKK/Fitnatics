import { useState, useMemo, useCallback } from "react";
import { produce } from "immer";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";

const memberNavItems = [
  { title: "Personal Details", description: "Enter your personal details" },
  { title: "Verify Email", description: "Verify your Email" },
  { title: "Select a Gym", description: "Select a Gym" },
  { title: "Choose Plan", description: "Choose a membership plan" },
];

function useGettingStartedPageHooks() {
  const [step, setStep] = useState(1);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({ member: {}, trainer: {} });
  const { isLoading, membershipPlans } = useFetchData();

  const queryClient = useQueryClient();

  /* INITIAL DATA TRANSFORM */
  const fetchedUser = useMemo(
    () => queryClient.getQueryData(["user"]),
    [queryClient]
  );

  const isEmailVerifiedInitially = useMemo(() => {
    if (fetchedUser?.email) return true;
    else return false;
  }, []); // eslint-disable-line

  const navItems = useMemo(() => {
    if (role == "member") {
      return memberNavItems.filter((navItem) =>
        isEmailVerifiedInitially ? navItem.title != "Verify Email" : true
      );
    } else {
      return [];
    }
  }, [role]); // eslint-disable-line

  useMemo(() => {
    if (fetchedUser?.email) {
      setIsEmailVerified(true);
    }
  }, [fetchedUser]);

  /* GETTER SETTER FUNCTIONS */
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
    navItems,
    isLoading,
    membershipPlans,
    isEmailVerifiedInitially,
    isEmailVerified,
    otpGeneratedAt,
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setMemberPersonalData,
    setMemberSelectedGym,
  };
}

export default useGettingStartedPageHooks;
