import { useState, useMemo, useCallback, useEffect } from "react";
import { produce } from "immer";
import useApiManager from "./useApiManager";

const memberNavItems = [
  { title: "Personal Details", description: "Enter your personal details" },
  { title: "Verify Email", description: "Verify your Email" },
  { title: "Select a Gym", description: "Select a Gym" },
  { title: "Choose Plan", description: "Choose a membership plan" },
];

function useOnboardingPageHooks() {
  const [step, setStep] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({ memberData: {}, trainerData: {} });

  const {
    fetchedUserData,
    isEmailVerifiedInitially,
    isLoading,
    membershipPlans,
    isSetupAccountPending,
    setupAccountHandler,
  } = useApiManager({ role, data });

  useEffect(() => {
    if (role === "member") {
      setData((prevData) => {
        const nextData = produce(prevData, (draftState) => {
          draftState.memberData = {
            ...draftState.memberData,
            ...fetchedUserData,
          };
        });
        return nextData;
      });
    }
  }, [role, fetchedUserData]);

  useEffect(() => {
    if (isEmailVerifiedInitially) {
      setIsEmailVerified(true);
    }
  }, []); // eslint-disable-line

  const navItems = useMemo(() => {
    if (role == "member") {
      return memberNavItems.filter((navItem) =>
        isEmailVerifiedInitially ? navItem.title != "Verify Email" : true
      );
    } else return [];
  }, [isEmailVerifiedInitially, role]);

  /* GETTER SETTER FUNCTIONS */
  const memberData = useMemo(() => data.memberData, [data]);

  const setMemberData = useCallback(
    (formData) => {
      const nextData = produce(data, (draftState) => {
        draftState.memberData = { ...draftState.memberData, ...formData };
      });
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

export default useOnboardingPageHooks;
