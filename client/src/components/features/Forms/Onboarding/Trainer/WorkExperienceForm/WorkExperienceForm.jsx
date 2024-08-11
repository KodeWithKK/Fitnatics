import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import Input from "@shared/base/Input/Input";
import TextArea from "@shared/base/TextArea/TextArea";

import { CircledCrossIcon, UpArrowIcon } from "@shared/icons/FormIcons";
import useWorkExperienceFormHooks from "./WorkExperienceForm.hooks";

function WorkExperienceForm() {
  const { errors, fields, register, handleSubmit, appendField, removeField } =
    useWorkExperienceFormHooks();

  return (
    <OnboardingForm
      className="mx-auto max-w-[564px] p-6 pb-2"
      onSubmit={handleSubmit}
    >
      <OnboardingForm.Headline className={"mb-4"} />

      {fields.map((field, idx) => (
        <div key={field.id} className="space-y-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-[18px]">Work Experience 0{idx + 1}</h4>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-100"
              onClick={removeField}
            >
              <CircledCrossIcon className="h-7 w-7" />
            </button>
          </div>
          <Input
            type="text"
            {...register(`workExperiences.${idx}.jobTitle`)}
            spellCheck="false"
            label="Job Title"
            placeholder="Enter Job Title"
            error={errors?.workExperiences?.[idx]?.jobTitle?.message}
            required={true}
          />
          <Input
            type="text"
            {...register(`workExperiences.${idx}.gymOrStudioName`)}
            spellCheck="false"
            label="Gym/Studio Name"
            placeholder="Enter Gym/Studio Name"
            error={errors?.workExperiences?.[idx]?.gymOrStudioName?.message}
            required={true}
          />

          <div>
            <div className="flex items-start gap-2">
              <Input
                type="text"
                {...register(`workExperiences.${idx}.employedFrom`)}
                spellCheck="false"
                label="Employment Period"
                placeholder="From (DD/MM/YYYY)"
                error={errors?.workExperiences?.[idx]?.employedFrom?.message}
                required={true}
              />

              <div className="mt-6 grid h-[42px] place-items-center">
                <UpArrowIcon className="h-6 w-6 rotate-90" />
              </div>

              <div className={`w-full pt-6`}>
                <Input
                  type="text"
                  {...register(`workExperiences.${idx}.employedTo`)}
                  spellCheck="false"
                  placeholder="To (DD/MM/YYYY)"
                  error={errors?.workExperiences?.[idx]?.employedTo?.message}
                  required={false}
                />
              </div>
            </div>

            <p className="mb-3 mt-1 text-[15px] text-gray-500">
              NOTE: Leave the To field empty if you are currently working there
            </p>
          </div>

          <TextArea
            {...register(`workExperiences.${idx}.breifJobDescription`)}
            label="Breif Job Description"
            placeholder="Enter a Brief Job Description"
            error={errors?.workExperiences?.[idx]?.breifJobDescription?.message}
          />
        </div>
      ))}

      <h4 className="my-3 mt-6 text-[18px]">
        Work Experience 0{fields.length + 1}
      </h4>
      <button
        type="button"
        className="mb-3 rounded bg-gray-800/[.8] px-2 py-1 text-gray-200"
        onClick={appendField}
      >
        Add Work Experience
      </button>
    </OnboardingForm>
  );
}

export default WorkExperienceForm;
