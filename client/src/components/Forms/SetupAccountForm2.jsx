import React from "react";
import StepsTracker from "./atoms/StepsTracker";
import FormInput from "./atoms/FormInput";
import FormSelect from "./atoms/FormSelect";

const SetupAccountForm2 = ({ formData, handleInput }) => {
  const formSubmitHandle = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
    },
    [formData]
  );

  return (
    <div className="bg-gray-950 h-screen py-8 px-[6%] overflow-y-auto">
      <div className="text-center mb-6">
        <a
          className="font-bold text-brand text-4xl tracking-wide uppercase "
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <StepsTracker totalSteps={4} currentStep={4} />

      <form
        className="mx-auto max-w-[586px] h-fit px-[6%] py-8 space-y-8 text-gray-200 border-2 border-dashed border-gray-900 rounded-md"
        onSubmit={formSubmitHandle}
      >
        <h1 className="font-bold text-gray-200 text-2xl text-center">
          Setup your Account
        </h1>

        <div>
          <FormSelect
            label="Workout Type"
            currentValue={"beginner"}
            handleChange={handleInput}
          >
            <option value="begineer">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </FormSelect>
          <FormInput
            label="Body Weight"
            type="text"
            name="name"
            onChange={handleInput}
            required={true}
            spellCheck={false}
          />
          <FormInput
            label="Diet Goals"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            required={true}
          />
        </div>

        <div>
          <button className="w-full bg-brand/[0.75] p-2.5 font-semibold rounded-md">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupAccountForm2;
