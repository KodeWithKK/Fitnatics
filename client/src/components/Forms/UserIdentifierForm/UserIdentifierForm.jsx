import { useState } from "react";
import { MemberIcon, TrainerIcon } from "./Icons";

const UserIdentifierForm = () => {
  const [selectedType, setSelectedType] = useState("member");

  return (
    <div className="border-gray-800 px-6 py-5 border border-dashed rounded-md w-[376px]">
      <h5 className="text-gray-200">Create Account as</h5>
      <p className="mt-2 mb-2.5 text-gray-500 text-pretty">
        Select the type of account you want to continue with
      </p>
      <div className="flex gap-3 my-4">
        <button
          type="button"
          className={`flex flex-1 items-center gap-2 border-gray-700 bg-gray-950 p-2 border rounded-md ${
            selectedType === "member" &&
            "border-0 outline outline-[3px] outline-brand"
          }`}
          onClick={() => setSelectedType("member")}
        >
          <MemberIcon className="w-10 h-10" />
          Member
        </button>
        <button
          type="button"
          className={`flex flex-1 items-center gap-2 border-gray-700 bg-gray-950 p-2 border rounded-md ${
            selectedType === "trainer" &&
            "border-0 outline outline-[3px] outline-brand"
          }`}
          onClick={() => setSelectedType("trainer")}
        >
          <TrainerIcon className="p-1 w-10 h-10" />
          Trainer
        </button>
      </div>

      <button
        type="button"
        className="bg-brand/[.75] mt-2 py-3 rounded-md w-full"
      >
        Continue
      </button>
    </div>
  );
};

export default UserIdentifierForm;
