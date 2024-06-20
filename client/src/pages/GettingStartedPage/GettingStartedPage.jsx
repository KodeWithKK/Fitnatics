import { createContext } from "react";
import GettingStartedPageLayout from "@layouts/GettingStartedPageLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
import MemberPersonalDetailForm from "@components/Forms/PersonalDetailForm/MemberPersonalDetailForm";
import VerifyEmailForm from "@components/Forms/VerifyEmailForm/VerifyEmailForm";
import SelectGymForm from "@components/Forms/SelectGymForm/SelectGymForm";
import PricingForm from "@components/Forms/PricingForm/PricingForm";
import useGettingStartedPageHooks from "./GettingStartedPage.hooks";

export const GettingStartedContext = createContext();

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
  } = useGettingStartedPageHooks();

  const value = {
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
  };

  if (isLoading) {
    return null;
  }

  return (
    <GettingStartedContext.Provider value={value}>
      <GettingStartedPageLayout>
        {step === 0 && (
          <div className="place-items-center grid -mt-8 h-full">
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
      </GettingStartedPageLayout>
    </GettingStartedContext.Provider>
  );
};

export default GettingStartedPage;
