import { useState } from "react";
import SetupAccountLayout from "@layouts/SetupAccountPageLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";
import SetupAccountFormLayout from "@layouts/SetupAccountFormLayout";
import PersonalDetailForm from "@components/Forms/PersonalDetailForm/PersonalDetailForm";
import SelectGymForm from "@components/Forms/SelectGymForm/SelectGymForm";
import MembershipForm from "@components/Forms/MembershipForm/MembershipForm";

const SetupAccountPage = () => {
  const [displayStep, setDisplayStep] = useState(1);
  const [role, setRole] = useState("member");

  return (
    <SetupAccountLayout>
      {displayStep === 1 && (
        <div className="place-items-center grid -mt-8 h-full">
          <UserIdentifierForm
            role={role}
            setRole={setRole}
            setDisplayStep={setDisplayStep}
          />
        </div>
      )}

      {2 <= displayStep && displayStep <= 4 && (
        <SetupAccountFormLayout
          displayStep={displayStep}
          setDisplayStep={setDisplayStep}
        >
          {displayStep === 2 && (
            <PersonalDetailForm setDisplayStep={setDisplayStep} />
          )}
          {displayStep === 3 && (
            <SelectGymForm setDisplayStep={setDisplayStep} />
          )}
          {displayStep === 4 && (
            <MembershipForm setDisplayStep={setDisplayStep} />
          )}
        </SetupAccountFormLayout>
      )}
    </SetupAccountLayout>
  );
};

export default SetupAccountPage;
