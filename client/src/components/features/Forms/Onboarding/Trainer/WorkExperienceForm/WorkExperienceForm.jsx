import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import Input from "@shared/base/Input/Input";
import TextArea from "@shared/base/TextArea/TextArea";
import Button from "@shared/base/Button/Button";
import useWorkExperienceFormHooks from "./WorkExperienceForm.hooks";
import cn from "@utils/cn";

import { CircledCrossIcon, UpArrowIcon } from "@shared/icons/FormIcons";

function WorkExperienceForm() {
  const { errors, fields, register, handleSubmit, appendField, removeField } =
    useWorkExperienceFormHooks();

  return (
    <OnboardingForm
      className="mx-auto max-w-[564px] p-6 pb-5"
      onSubmit={handleSubmit}
    >
      <OnboardingForm.Headline className={"mb-4"} />

      {fields.map((field, idx) => (
        <div
          key={field.id}
          className={cn("mb-6 space-y-3", idx + 1 === fields.length && "mb-4")}
        >
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

      <Button variant="text" onClick={appendField}>
        Add {fields.length > 0 && "Another"} Work Experience
      </Button>
    </OnboardingForm>
  );
}

export default WorkExperienceForm;
