import { useState, useMemo, useCallback } from "react";
import { produce } from "immer";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchData } from "./useFetchData";
import { useSetupAccount } from "./useSetupAccount";

const memberNavItems = [
  { title: "Personal Details", description: "Enter your personal details" },
  { title: "Verify Email", description: "Verify your Email" },
  { title: "Select a Gym", description: "Select a Gym" },
  { title: "Choose Plan", description: "Choose a membership plan" },
];

function useGettingStartedPageHooks() {
  const [step, setStep] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({ memberData: {}, trainerData: {} });
  const { isLoading, membershipPlans } = useFetchData();

  const { isSetupAccountPending, setupAccountHandler } = useSetupAccount({
    data,
    role,
  });

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
  const memberData = useMemo(() => data.memberData, [data]);

  const setMemberData = useCallback(
    (formData) => {
      const nextData = { ...data, memberData: { ...formData } };
      setData(nextData);
    },
    [data]
  );

  const memberGymOutlet = useMemo(() => data.memberData?.gymOutlet, [data]);

  const setMemberGymOutlet = useCallback(
    (value) => {
      const nextData = produce(data, (draftState) => {
        draftState.memberData.gymOutlet = value;
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
    memberData,
    memberGymOutlet,
    isSetupAccountPending,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setMemberData,
    setMemberGymOutlet,
    setupAccountHandler,
  };
}

export default useGettingStartedPageHooks;
