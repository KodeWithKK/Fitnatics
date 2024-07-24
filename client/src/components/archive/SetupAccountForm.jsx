import React from "react";
import AvatarImage from "./atoms/AvatarImage";
import Input from "@components/comman/Input/Input";
// import Select from "@components/comman/Select/Select";
import { HorizontalDivider } from "./atoms/Icons";

const SetupAccountForm = ({ formData, handleInput }) => {
  const avatarRef = React.useRef();

  const handleAvatarInput = React.useCallback(() => {
    avatarRef.current.click();
  }, []);

  const formSubmitHandle = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
    },
    [formData],
  );

  return (
    <div className="h-screen overflow-y-auto px-[6%] py-8">
      <div className="text-center">
        <a
          className="text-[35px] font-bold uppercase tracking-wide text-brand"
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <div className="mb-6 mt-4 flex justify-center text-gray-600">
        <HorizontalDivider className="h-3 w-12" />
      </div>

      <form
        className="mx-auto h-fit max-w-[586px] space-y-10 rounded-md border-2 border-dashed border-gray-800/[.5] px-[6%] py-8 text-gray-200"
        onSubmit={formSubmitHandle}
      >
        <h1 className="text-center text-3xl font-bold text-gray-200">
          Setup your Account
        </h1>

        <div className="">
          <AvatarImage
            ref={avatarRef}
            className="mx-auto mb-8 h-[152px] w-[152px] border border-gray-600 bg-gray-600"
            handleAvatarInput={handleAvatarInput}
          />

          <Input
            label="Name*"
            type="text"
            name="name"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />
          <Input
            label="Phone No*"
            type="number"
            name="phoneno"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />
          <Input
            label="Height*"
            type="text"
            name="phoneno"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />

          {/* <Select
            label="Role*"
            name="role"
            currentValue={formData.role}
            handleChange={handleInput}
          >
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </Select> */}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="w-full rounded-md bg-gray-800/[0.8] p-2.5 font-semibold"
          >
            Go Home
          </button>
          <button
            type="submit"
            className="w-full rounded-md bg-brand/[0.75] p-2.5 font-semibold"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupAccountForm;
