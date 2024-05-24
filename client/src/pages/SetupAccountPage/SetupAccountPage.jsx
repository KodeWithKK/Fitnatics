import { useState } from "react";
import SetupAccountLayout from "@layouts/SetupAccountPageLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";
import SetupAccountFormLayout from "@layouts/SetupAccountFormLayout";

const SetupAccountPage = () => {
  const [displayStep, setDisplayStep] = useState(1);
  const [role, setRole] = useState("");

  return (
    <SetupAccountLayout>
      {displayStep === 1 && (
        <div className="place-items-center grid -mt-8 h-full">
          <UserIdentifierForm
            setRole={setRole}
            setDisplayStep={setDisplayStep}
          />
        </div>
      )}

      {displayStep === 2 && (
        <SetupAccountFormLayout displayStep={displayStep} />
      )}
    </SetupAccountLayout>
  );
};

export default SetupAccountPage;
