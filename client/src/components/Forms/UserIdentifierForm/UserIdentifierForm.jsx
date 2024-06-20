import { useContext } from "react";
import { MemberIcon, TrainerIcon } from "./Icons";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";

const UserIdentifierForm = () => {
  const { role, setRole, setStep } = useContext(GettingStartedContext);

  return (
    <div className="border-gray-800 px-6 py-5 border border-dashed rounded-md w-[382px]">
      <h3 className="font-bold text-[23px] text-center text-gray-200">
        Account Type
      </h3>
      <p className="my-2.5 text-gray-500 text-pretty">
        Select the type you would like to join us in Fitnatics!
      </p>
      <div className="flex gap-3 my-5">
        <button
          type="button"
          className={`flex flex-1 items-center gap-2 border-gray-700 p-2 border rounded-md ${
            role === "member"
              ? "border-0 outline outline-[3px] outline-brand bg-blue-900/[.5]"
              : "bg-gray-950"
          }`}
          onClick={() => setRole("member")}
        >
          <MemberIcon className="w-10 h-10" />
          Member
        </button>
        <button
          type="button"
          className={`flex flex-1 items-center gap-2 border-gray-700 p-2 border rounded-md ${
            role === "trainer"
              ? "border-0 outline outline-[3px] outline-brand bg-blue-900/[.5]"
              : "bg-gray-950"
          }`}
          onClick={() => setRole("trainer")}
        >
          <TrainerIcon className="p-1 w-10 h-10" />
          Trainer
        </button>
      </div>

      <button
        type="button"
        className="bg-brand/[.75] mt-2 py-3 rounded-md w-full"
        onClick={() => setStep((prevStep) => ++prevStep)}
      >
        Continue
      </button>
    </div>
  );
};

export default UserIdentifierForm;
