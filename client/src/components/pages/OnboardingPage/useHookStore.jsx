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
    tPersonalDetails,
    tProfessionalDetails,
    isSetupAccountPending,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setMPersonalDetails,
    setMGymOutlet,
    setTPersonalDetails,
    setTProfessionalDetails,
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
      tPersonalDetails,
      tProfessionalDetails,
      isSetupAccountPending,
      setStep,
      setRole,
      setIsEmailVerified,
      setOtpGeneratedAt,
      setMPersonalDetails,
      setMGymOutlet,
      setTPersonalDetails,
      setTProfessionalDetails,
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
      tPersonalDetails,
      tProfessionalDetails,
      isSetupAccountPending,
      setStep,
      setRole,
      setIsEmailVerified,
      setOtpGeneratedAt,
      setMPersonalDetails,
      setMGymOutlet,
      setTPersonalDetails,
      setTProfessionalDetails,
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
