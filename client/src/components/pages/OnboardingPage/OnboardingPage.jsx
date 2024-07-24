import { createContext } from "react";
import OnboardingPageLayout from "@layouts/OnboardingPageLayout/OnboardingPageLayout";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
import UserIdentifierForm from "@features/Forms/Onboarding/Member/UserIdentifierForm/UserIdentifierForm";
import MPersonalDetailForm from "@features/Forms/Onboarding/Member/PersonalDetailsForm/PersonalDetailsForm";
import MVerifyEmailForm from "@features/Forms/Onboarding/Member/VerifyEmailForm/VerifyEmailForm";
import MSelectGymForm from "@features/Forms/Onboarding/Member/SelectGymForm/SelectGymForm";
import MPricingForm from "@features/Forms/Onboarding/Member/PricingForm/PricingForm";
import TPersonalDetailsForm from "@features/Forms/Onboarding/Trainer/PersonalDetailsForm/PersonalDetailsForm";
import TProfessionalDetailsForm from "@features/Forms/Onboarding/Trainer/ProfessionalDetailsForm/ProfessionalDetailsForm";
import TVerifyEmailForm from "@features/Forms/Onboarding/Trainer/VerifyEmailForm/VerifyEmailForm";
import TSubmitForm from "@features/Forms/Onboarding/Trainer/SubmitForm/SubmitForm";
import useHookStore from "./useHookStore";

export const OnboardingContext = createContext();

const GettingStartedPage = () => {
  const { onboardingContextValue, essentialPageValues } = useHookStore();
  const { step, role, isLoading, isEmailVerifiedInitially } =
    essentialPageValues;

  if (isLoading) {
    return null;
  }

  return (
    <OnboardingContext.Provider value={onboardingContextValue}>
      <OnboardingPageLayout>
        {step === 0 && (
          <div className="-mt-8 grid h-full place-items-center">
            <UserIdentifierForm />
          </div>
        )}

        {/* MEMBERS WHOSE WERE ARE VERIFIED */}
        {step >= 1 && role === "member" && isEmailVerifiedInitially && (
          <>
            {step === 1 && <MPersonalDetailForm />}
            {step === 2 && <MSelectGymForm />}
            {step === 3 && <MPricingForm />}
          </>
        )}

        {step >= 1 && role === "member" && !isEmailVerifiedInitially && (
          <>
            {step === 1 && <MPersonalDetailForm />}
            {step === 2 && <MVerifyEmailForm />}
            {step === 3 && <MSelectGymForm />}
            {step === 4 && <MPricingForm />}
          </>
        )}

        {/* TRAINER */}
        {step >= 1 && role === "trainer" && isEmailVerifiedInitially && (
          <>
            {step == 1 && <TPersonalDetailsForm />}
            {step == 2 && <TProfessionalDetailsForm />}
            {step == 3 && <TSubmitForm />}
          </>
        )}

        {step >= 1 && role === "trainer" && !isEmailVerifiedInitially && (
          <>
            {step == 1 && <TPersonalDetailsForm />}
            {step == 2 && <TProfessionalDetailsForm />}
            {step == 3 && <TVerifyEmailForm />}
            {step == 4 && <TSubmitForm />}
          </>
        )}
      </OnboardingPageLayout>
    </OnboardingContext.Provider>
  );
};

export default GettingStartedPage;
