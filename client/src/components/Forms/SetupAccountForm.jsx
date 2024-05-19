import React from "react";
import AvatarImage from "./atoms/AvatarImage";
import FormInput from "./atoms/FormInput";
import FormSelect from "./atoms/FormSelect";
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
    [formData]
  );

  return (
    <div className="bg-gray-950 px-[6%] py-8 h-screen overflow-y-auto">
      <div className="text-center">
        <a
          className="font-bold text-[35px] text-brand uppercase tracking-wide"
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <div className="flex justify-center mt-4 mb-6 text-gray-600">
        <HorizontalDivider className="w-12 h-3" />
      </div>

      <form
        className="space-y-10 border-2 border-gray-800/[.5] mx-auto px-[6%] py-8 border-dashed rounded-md max-w-[586px] h-fit text-gray-200"
        onSubmit={formSubmitHandle}
      >
        <h1 className="font-bold text-3xl text-center text-gray-200">
          Setup your Account
        </h1>

        <div className="">
          <AvatarImage
            ref={avatarRef}
            className="border-gray-600 bg-gray-600 mx-auto mb-8 border w-[152px] h-[152px]"
            handleAvatarInput={handleAvatarInput}
          />

          <FormInput
            label="Name*"
            type="text"
            name="name"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />
          <FormInput
            label="Phone No*"
            type="number"
            name="phoneno"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />
          <FormInput
            label="Height*"
            type="text"
            name="phoneno"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />

          <FormSelect
            label="Role*"
            name="role"
            currentValue={formData.role}
            handleChange={handleInput}
          >
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </FormSelect>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="bg-gray-800/[0.8] p-2.5 rounded-md w-full font-semibold"
          >
            Go Home
          </button>
          <button
            type="submit"
            className="bg-brand/[0.75] p-2.5 rounded-md w-full font-semibold"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupAccountForm;
