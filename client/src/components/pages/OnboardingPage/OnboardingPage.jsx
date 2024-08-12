import { createContext, Fragment } from "react";
import OnboardingPageLayout from "@layouts/OnboardingPageLayout/OnboardingPageLayout";
import UserIdentifierForm from "@features/Forms/Onboarding/Member/UserIdentifierForm/UserIdentifierForm";
import MPersonalDetailForm from "@features/Forms/Onboarding/Member/PersonalDetailsForm/PersonalDetailsForm";
import MVerifyEmailForm from "@features/Forms/Onboarding/Member/VerifyEmailForm/VerifyEmailForm";
import MSelectGymForm from "@features/Forms/Onboarding/Member/SelectGymForm/SelectGymForm";
import MPricingForm from "@features/Forms/Onboarding/Member/PricingForm/PricingForm";
import TPersonalDetailsForm from "@features/Forms/Onboarding/Trainer/PersonalDetailsForm/PersonalDetailsForm";
import TVerifyEmailForm from "@features/Forms/Onboarding/Trainer/VerifyEmailForm/VerifyEmailForm";
import TEducationDetailsForm from "@features/Forms/Onboarding/Trainer/EducationDetailsForm/EducationDetailsForm";
import TUploadCertificatesForm from "@features/Forms/Onboarding/Trainer/UploadCertificatesForm/UploadCertificatesForm";
import TWorkExperienceForm from "@features/Forms/Onboarding/Trainer/WorkExperienceForm/WorkExperienceForm";
import TOtherDetailsForm from "@features/Forms/Onboarding/Trainer/OtherDetailsForm/OtherDetailsForm";
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

        {/* MEMBERS */}
        {step >= 1 &&
          role === "member" &&
          memberForms
            .filter((_, idx) => !(isEmailVerifiedInitially && idx === 1))
            .map(({ id, Form }, idx) => (
              <Fragment key={id}>{step === idx + 1 && <Form />}</Fragment>
            ))}

        {/* TRAINER */}
        {step >= 1 &&
          role === "trainer" &&
          trainerForms
            .filter((_, idx) => !(isEmailVerifiedInitially && idx === 1))
            .map(({ id, Form }, idx) => (
              <Fragment key={id}>{step === idx + 1 && <Form />}</Fragment>
            ))}
      </OnboardingPageLayout>
    </OnboardingContext.Provider>
  );
};

const memberForms = [
  { id: window.crypto.randomUUID(), Form: MPersonalDetailForm },
  { id: window.crypto.randomUUID(), Form: MVerifyEmailForm },
  { id: window.crypto.randomUUID(), Form: MSelectGymForm },
  { id: window.crypto.randomUUID(), Form: MPricingForm },
];

const trainerForms = [
  { id: window.crypto.randomUUID(), Form: TPersonalDetailsForm },
  { id: window.crypto.randomUUID(), Form: TVerifyEmailForm },
  { id: window.crypto.randomUUID(), Form: TEducationDetailsForm },
  { id: window.crypto.randomUUID(), Form: TUploadCertificatesForm },
  { id: window.crypto.randomUUID(), Form: TWorkExperienceForm },
  { id: window.crypto.randomUUID(), Form: TOtherDetailsForm },
];

export default GettingStartedPage;
