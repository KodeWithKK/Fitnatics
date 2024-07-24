import { useState, useEffect } from "react";
import { produce } from "immer";
import useApiManager from "./useApiManager";
import useDataTransformer from "./useDataTransformer";

function useOnboardingPageHooks() {
  const [step, setStep] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(null);
  const [role, setRole] = useState("member");
  const [data, setData] = useState({
    memberData: {
      personalDetails: {},
      gymOutlet: "",
    },
    trainerData: {
      personalDetails: {},
      professionalDetials: {},
    },
  });

  const {
    fetchedUserData,
    isEmailVerifiedInitially,
    isLoading,
    membershipPlans,
    isSetupAccountPending,
    setupAccountHandler,
  } = useApiManager({ role, data });

  useEffect(() => {
    setData((prevData) => {
      const nextData = produce(prevData, (draftState) => {
        draftState.memberData.personalDetails = {
          ...draftState.memberData.personalDetails,
          ...fetchedUserData,
        };

        draftState.trainerData.personalDetails = {
          ...draftState.trainerData.personalDetails,
          ...fetchedUserData,
        };
      });
      return nextData;
    });
  }, [fetchedUserData]);

  useEffect(() => {
    if (isEmailVerifiedInitially) {
      setIsEmailVerified(true);
    }
  }, []); // eslint-disable-line

  const {
    navItems,
    mData,
    mPersonalDetails,
    mGymOutlet,
    setMPersonalDetails,
    setMGymOutlet,
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
    mData,
    mPersonalDetails,
    mGymOutlet,
    isSetupAccountPending,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setMPersonalDetails,
    setMGymOutlet,
    setupAccountHandler,
  };
}

export default useOnboardingPageHooks;
