import GettingStartedPageLayout from "@layouts/GettingStartedPageLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
import MemberPersonalDetailForm from "@components/Forms/PersonalDetailForm/MemberPersonalDetailForm";
import SelectGymForm from "@components/Forms/SelectGymForm/SelectGymForm";
import PricingForm from "@components/Forms/PricingForm/PricingForm";
import useGettingStartedPagehooks from "./GettingStartedPage.hooks";

const GettingStartedPage = () => {
  const {
    step,
    role,
    memberPersonalData,
    memberSelectedGym,
    setStep,
    setRole,
    setMemberPersonalData,
    setMemberSelectedGym,
  } = useGettingStartedPagehooks();

  return (
    <GettingStartedPageLayout>
      {step === 1 && (
        <div className="place-items-center grid -mt-8 h-full">
          <UserIdentifierForm role={role} setRole={setRole} setStep={setStep} />
        </div>
      )}

      {2 <= step && step <= 4 && (
        <SteperLayout step={step} setStep={setStep}>
          {step === 2 && (
            <MemberPersonalDetailForm
              formData={memberPersonalData}
              setFormData={setMemberPersonalData}
            />
          )}
          {step === 3 && (
            <SelectGymForm
              selectedGym={memberSelectedGym}
              setSelectedGym={setMemberSelectedGym}
            />
          )}
          {step === 4 && <PricingForm />}
        </SteperLayout>
      )}
    </GettingStartedPageLayout>
  );
};

export default GettingStartedPage;
