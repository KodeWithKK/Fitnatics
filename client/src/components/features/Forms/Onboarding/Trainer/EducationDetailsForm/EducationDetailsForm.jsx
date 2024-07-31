import Input from "@shared/base/Input/Input";
import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import useEducationalDetailsHooks from "./EducationDetailsForm.hooks";
import FileUpload from "@shared/base/FileUpload/FileUpload";
import { Controller } from "react-hook-form";

function EducationDetailsForm() {
  const { register, handleSubmit, control, errors } =
    useEducationalDetailsHooks();

  return (
    <OnboardingForm
      className="mx-auto max-w-[564px] p-6 pb-2"
      onSubmit={handleSubmit}
    >
      <OnboardingForm.Headline className={"mb-4"} />

      <Input
        type="text"
        {...register("highestQualification")}
        spellCheck="false"
        label="Highest Qualification"
        placeholder="Enter Highest Qualification"
        className={"border-gray-900/[.8]"}
        error={errors?.highestQualification?.message}
        required={true}
      />

      <Input
        type="text"
        {...register("institutionName")}
        spellCheck="false"
        label="Institution Name"
        placeholder="Enter Institution Name"
        className={"border-gray-900/[.8]"}
        error={errors?.institutionName?.message}
        required={true}
      />

      <Input
        type="text"
        {...register("yearOfCompletion")}
        spellCheck="false"
        label="Year of Completion"
        placeholder="Enter Year of Completion"
        className={"border-gray-900/[.8]"}
        error={errors?.yearOfCompletion?.message}
        required={true}
      />

      <Controller
        name="marksheet"
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <FileUpload
            value={field.value}
            onChange={field.onChange}
            label="Upload Marksheet"
            accept={".pdf"}
          />
        )}
      />
    </OnboardingForm>
  );
}

export default EducationDetailsForm;
