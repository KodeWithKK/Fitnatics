import { createContext, useMemo } from "react";
import OnboardingPageLayout from "@layouts/OnboardingPageLayout/OnboardingPageLayout";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
import UserIdentifierForm from "@features/Forms/Onboarding/Member/UserIdentifierForm/UserIdentifierForm";
import MemberPersonalDetailForm from "@features/Forms/Onboarding/Member/PersonalDetailForm/PersonalDetailForm";
import VerifyEmailForm from "@features/Forms/Onboarding/Member/VerifyEmailForm/VerifyEmailForm";
import SelectGymForm from "@features/Forms/Onboarding/Member/SelectGymForm/SelectGymForm";
import PricingForm from "@features/Forms/Onboarding/Member/PricingForm/PricingForm";
import useOnboardingPageHooks from "./OnboardingPage.hooks";

export const OnboardingContext = createContext();

const GettingStartedPage = () => {
  const {
    step,
    role,
    navItems,
    isLoading,
    membershipPlans,
    isEmailVerifiedInitially,
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

  const value = useMemo(
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

  if (isLoading) {
    return null;
  }

  return (
    <OnboardingContext.Provider value={value}>
      <OnboardingPageLayout>
        {step === 0 && (
          <div className="grid h-full -mt-8 place-items-center">
            <UserIdentifierForm />
          </div>
        )}

        {/* MEMBERS WHOSE WERE ARE VERIFIED */}
        {step >= 1 && role === "member" && isEmailVerifiedInitially && (
          <SteperLayout>
            {step === 1 && <MemberPersonalDetailForm />}
            {step === 2 && <SelectGymForm />}
            {step === 3 && <PricingForm />}
          </SteperLayout>
        )}

        {step >= 1 && role === "member" && !isEmailVerifiedInitially && (
          <SteperLayout>
            {step === 1 && <MemberPersonalDetailForm />}
            {step === 2 && <VerifyEmailForm />}
            {step === 3 && <SelectGymForm />}
            {step === 4 && <PricingForm />}
          </SteperLayout>
        )}

        {/* TRAINER */}
        {step >= 1 && role === "trainer" && <SteperLayout></SteperLayout>}
      </OnboardingPageLayout>
    </OnboardingContext.Provider>
  );
};

export default GettingStartedPage;
