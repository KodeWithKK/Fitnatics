import { useContext } from "react";
import { MemberIcon, TrainerIcon } from "./Icons";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";

const UserIdentifierForm = () => {
  const { role, setRole, setStep } = useContext(OnboardingContext);

  return (
    <div className="w-[382px] rounded-md border border-dashed border-gray-800 px-6 py-5">
      <h3 className="text-center text-[23px] font-bold text-gray-200">
        Account Type
      </h3>
      <p className="my-2.5 text-pretty text-gray-500">
        Select the type you would like to join us in Fitnatics!
      </p>
      <div className="my-5 flex gap-3">
        <button
          type="button"
          className={`flex flex-1 items-center gap-2 rounded-md border border-gray-700 p-2 ${
            role === "member"
              ? "border-0 bg-blue-900/[.5] outline outline-[3px] outline-brand"
              : "bg-gray-950"
          }`}
          onClick={() => setRole("member")}
        >
          <MemberIcon className="h-10 w-10" />
          Member
        </button>
        <button
          type="button"
          className={`flex flex-1 items-center gap-2 rounded-md border border-gray-700 p-2 ${
            role === "trainer"
              ? "border-0 bg-blue-900/[.5] outline outline-[3px] outline-brand"
              : "bg-gray-950"
          }`}
          onClick={() => setRole("trainer")}
        >
          <TrainerIcon className="h-10 w-10 p-1" />
          Trainer
        </button>
      </div>

      <button
        type="button"
        className="mt-2 w-full rounded-md bg-brand/[.75] py-3"
        onClick={() => setStep((prevStep) => ++prevStep)}
      >
        Continue
      </button>
    </div>
  );
};

export default UserIdentifierForm;
