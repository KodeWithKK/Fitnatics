import SetupAccountPageLayout from "@layouts/SetupAccountPageLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";
import SetupAccountFormLayout from "@layouts/SetupAccountFormLayout/SetupAccountFormLayout";
import PersonalDetailForm from "@components/Forms/PersonalDetailForm/PersonalDetailForm";
import SelectGymForm from "@components/Forms/SelectGymForm/SelectGymForm";
import MembershipForm from "@components/Forms/MembershipForm/MembershipForm";
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
        <SetupAccountFormLayout step={step} setStep={setStep}>
          {step === 2 && (
            <PersonalDetailForm data={data[role]} addData={addData} />
          )}
          {step === 3 && <SelectGymForm data={data[role]} addData={addData} />}
          {step === 4 && <MembershipForm data={data[role]} addData={addData} />}
        </SetupAccountFormLayout>
      )}
    </SetupAccountPageLayout>
  );
};

export default SetupAccountPage;
