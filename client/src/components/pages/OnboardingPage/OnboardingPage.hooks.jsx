import { useState, useEffect } from "react";
import { produce } from "immer";
import useApiManager from "./useApiManager";
import useDataTransformer from "./useDataTransformer";

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

  const {
    navItems,
    memberData,
    memberGymOutlet,
    setMemberData,
    setMemberGymOutlet,
  } = useDataTransformer({
    role,
    data,
    setData,
    isEmailVerifiedInitially,
  });

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
