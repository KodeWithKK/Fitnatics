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
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setMemberPersonalData,
    setMemberSelectedGym,
  } = useGettingStartedPageHooks();

  const value = {
    step,
    role,
    navItems,
    membershipPlans,
    isEmailVerified,
    otpGeneratedAt,
    isFormRequestPending,
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setMemberPersonalData,
    setMemberSelectedGym,
  };

  if (isLoading) {
    return null;
  }

  return (
    <GettingStartedContext.Provider value={value}>
      <GettingStartedPageLayout>
        {step === 1 && (
          <div className="place-items-center grid -mt-8 h-full">
            <UserIdentifierForm />
          </div>
        )}

        {/* MEMBERS WHOSE WERE ARE VERIFIED */}
        {step >= 2 && role === "member" && isEmailVerifiedInitially && (
          <SteperLayout>
            {step === 2 && <MemberPersonalDetailForm />}
            {step === 3 && <SelectGymForm />}
            {step === 4 && <PricingForm />}
          </SteperLayout>
        )}

        {step >= 2 && role === "member" && !isEmailVerifiedInitially && (
          <SteperLayout>
            {step === 2 && <MemberPersonalDetailForm />}
            {step === 3 && <VerifyEmailForm />}
            {step === 4 && <SelectGymForm />}
            {step === 5 && <PricingForm />}
          </SteperLayout>
        )}

        {/* TRAINER */}
        {step >= 2 && role === "trainer" && <SteperLayout></SteperLayout>}
      </GettingStartedPageLayout>
    </GettingStartedContext.Provider>
  );
};

export default GettingStartedPage;
