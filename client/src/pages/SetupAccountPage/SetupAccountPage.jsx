import SetupAccountPageLayout from "@layouts/SetupAccountPageLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";
import GettingStartedLayout from "@layouts/GettingStartedLayout/GettingStartedLayout";
import MemberPersonalDetailForm from "@components/Forms/PersonalDetailForm/MemberPersonalDetailForm";
import SelectGymForm from "@components/Forms/SelectGymForm/SelectGymForm";
import PricingForm from "@components/Forms/PricingForm/PricingForm";
import useSetupAccountPagehooks from "./SetupAccountPage.hooks";

const SetupAccountPage = () => {
  const { step, role, data, setStep, setRole, addData } =
    useSetupAccountPagehooks();

  return (
    <SetupAccountPageLayout>
      {step === 1 && (
        <div className="place-items-center grid -mt-8 h-full">
          <UserIdentifierForm role={role} setRole={setRole} setStep={setStep} />
        </div>
      )}

      {2 <= step && step <= 4 && (
        <GettingStartedLayout step={step} setStep={setStep}>
          {step === 2 && (
            <MemberPersonalDetailForm data={data[role]} addData={addData} />
          )}
          {step === 3 && <SelectGymForm data={data[role]} addData={addData} />}
          {step === 4 && <PricingForm data={data[role]} addData={addData} />}
        </GettingStartedLayout>
      )}
    </SetupAccountPageLayout>
  );
};

export default SetupAccountPage;
