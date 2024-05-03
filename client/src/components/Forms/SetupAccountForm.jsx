import React from "react";
import StepsTracker from "./atoms/StepsTracker";
import AvatarImage from "./atoms/AvatarImage";
import FormInput from "./atoms/FormInput";
import FormSelect from "./atoms/FormSelect";

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
      <div className="mb-6 text-center">
        <a
          className="font-bold text-4xl text-brand uppercase tracking-wide"
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <StepsTracker totalSteps={4} currentStep={3} />

      <form
        className="space-y-8 border-2 border-gray-900 mx-auto px-[6%] py-8 border-dashed rounded-md max-w-[586px] h-fit text-gray-200"
        onSubmit={formSubmitHandle}
      >
        <h1 className="font-bold text-2xl text-center text-gray-200">
          Setup your Account
        </h1>

        <div>
          <AvatarImage
            ref={avatarRef}
            className="border-gray-600 bg-gray-600 mx-auto mb-8 border w-[152px] h-[152px]"
            onClick={handleAvatarInput}
          />

          <FormInput
            label="Name"
            type="text"
            name="name"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            required={true}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            required={true}
          />
          <FormInput
            label="Phone No"
            type="number"
            name="phoneno"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />

          <FormSelect
            label="Role"
            currentValue={formData.role}
            handleChange={handleInput}
          >
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </FormSelect>
        </div>

        <div>
          <button className="bg-brand/[0.75] p-2.5 rounded-md w-full font-semibold">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupAccountForm;
