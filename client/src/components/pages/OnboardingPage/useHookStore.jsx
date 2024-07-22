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
    }),
    [
      step,
      role,
      navItems,
      membershipPlans,
      isEmailVerified,
      otpGeneratedAt,
      isFormRequestPending,
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
    ]
  );

  const essentialPageValues = useMemo(
    () => ({
      step,
      role,
      isLoading,
      isEmailVerifiedInitially,
    }),
    [step, role, isLoading, isEmailVerifiedInitially]
  );

  return { onboardingContextValue, essentialPageValues };
}

export default useHooksStore;
