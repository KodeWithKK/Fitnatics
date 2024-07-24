import { useMemo } from "react";
import useOnboardingPageHooks from "./OnboardingPage.hooks";

function useHooksStore() {
  const {
    step,
    role,
    navItems,
    isLoading,
    isEmailVerifiedInitially,
    membershipPlans,
    isEmailVerified,
    otpGeneratedAt,
    isFormRequestPending,
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
  } = useOnboardingPageHooks();

  const onboardingContextValue = useMemo(
    () => ({
      step,
      role,
      navItems,
      membershipPlans,
      isEmailVerified,
      otpGeneratedAt,
      isFormRequestPending,
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
    }),
    [
      step,
      role,
      navItems,
      membershipPlans,
      isEmailVerified,
      otpGeneratedAt,
      isFormRequestPending,
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
    ],
  );

  const essentialPageValues = useMemo(
    () => ({
      step,
      role,
      isLoading,
      isEmailVerifiedInitially,
    }),
    [step, role, isLoading, isEmailVerifiedInitially],
  );

  return { onboardingContextValue, essentialPageValues };
}

export default useHooksStore;
