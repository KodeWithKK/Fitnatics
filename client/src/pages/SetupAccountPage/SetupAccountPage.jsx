import { useState } from "react";
import SetupAccountLayout from "@layouts/SetupAccountLayout";
import UserIdentifierForm from "@components/Forms/UserIdentifierForm/UserIdentifierForm";

const SetupAccountPage = () => {
  const [displayStep, setDisplayStep] = useState(0);

  return (
    <SetupAccountLayout>
      {displayStep === 0 && (
        <div className="place-items-center grid -mt-8 h-full">
          <UserIdentifierForm />
        </div>
      )}
    </SetupAccountLayout>
  );
};

export default SetupAccountPage;
