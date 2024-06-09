import { createContext } from "react";
import GettingStartedPageLayout from "@layouts/GettingStartedPageLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
import MemberPersonalDetailForm from "@components/Forms/PersonalDetailForm/MemberPersonalDetailForm";
import SelectGymForm from "@components/Forms/SelectGymForm/SelectGymForm";
import PricingForm from "@components/Forms/PricingForm/PricingForm";
import useGettingStartedPagehooks from "./GettingStartedPage.hooks";

export const GettingStartedContext = createContext();

const GettingStartedPage = () => {
  const {
    step,
    role,
    navItems,
    isEmailVerified,
    otpGeneratedAt,
    isFormRequestPending,
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setIsFormRequestPending,
    setMemberPersonalData,
    setMemberSelectedGym,
  } = useGettingStartedPagehooks();

  const value = {
    step,
    role,
    navItems,
    isEmailVerified,
    otpGeneratedAt,
    isFormRequestPending,
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setIsEmailVerified,
    setOtpGeneratedAt,
    setIsFormRequestPending,
    setMemberPersonalData,
    setMemberSelectedGym,
  };

  return (
    <GettingStartedContext.Provider value={value}>
      <GettingStartedPageLayout>
        {step === 1 && (
          <div className="place-items-center grid -mt-8 h-full">
            <UserIdentifierForm />
          </div>
        )}

        {/* MEMBERS WHOSE WERE ARE VERIFIED */}
        {step >= 2 && role === "member" && (
          <SteperLayout>
            {step === 2 && <MemberPersonalDetailForm />}
            {step === 3 && <SelectGymForm />}
            {step === 4 && <PricingForm />}
          </SteperLayout>
        )}

        {/* TRAINER */}
        {step >= 2 && role === "trainer" && <SteperLayout></SteperLayout>}
      </GettingStartedPageLayout>
    </GettingStartedContext.Provider>
  );
};

export default GettingStartedPage;
