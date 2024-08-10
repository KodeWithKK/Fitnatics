import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import Input from "@shared/base/Input/Input";
import FileUpload from "@shared/base/FileUpload/FileUpload";
import useUploadCertificatesFormHooks from "./UploadCertificatesForm.hooks";
import { Controller } from "react-hook-form";

import { CircledCrossIcon } from "@shared/icons/FormIcons";

function UploadCertificatesForm() {
  const {
    control,
    errors,
    fields,
    register,
    handleSubmit,
    appendField,
    removeField,
  } = useUploadCertificatesFormHooks();

  return (
    <OnboardingForm
      className="mx-auto max-w-[564px] p-6 pb-2"
      onSubmit={handleSubmit}
    >
      <OnboardingForm.Headline className={"mb-4"} />

      {fields.map((field, idx) => (
        <div key={field.id} className="mb-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-[18px]">Certificate 0{idx + 1}</h4>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-100"
              onClick={() => removeField(idx)}
            >
              <CircledCrossIcon className="h-7 w-7" />
            </button>
          </div>

          <Input
            type="text"
            {...register(`certificates.${idx}.nameOfCertification`)}
            spellCheck="false"
            label="Name of Certification"
            placeholder="Enter Name of Certification"
            required={true}
            error={errors?.certificates?.[idx]?.nameOfCertification?.message}
          />

          <Input
            type="text"
            {...register(`certificates.${idx}.certifyingBody`)}
            spellCheck="false"
            label="Certifying Body"
            placeholder="Enter Certifying Body"
            required={true}
            error={errors?.certificates?.[idx]?.certifyingBody?.message}
          />

          <Input
            type="text"
            {...register(`certificates.${idx}.certifiationDate`)}
            spellCheck="false"
            label="Certification Date"
            placeholder="Enter Date of Certification (DD/MM/YYYY)"
            required={true}
            error={errors?.certificates?.[idx]?.certifiationDate?.message}
          />

          <Input
            type="text"
            {...register(`certificates.${idx}.expirationDate`)}
            spellCheck="false"
            label="Expiration Date (if applicable)"
            placeholder="Enter Expiration Date (DD/MM/YYYY)"
            required={false}
            error={errors?.certificates?.[idx]?.expirationDate?.message}
          />

          <Controller
            name={`certificates.${idx}.certificate`}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={field.onChange}
                label="Upload Certificate"
                accept={".pdf"}
              />
            )}
          />
        </div>
      ))}

      <h4 className="mb-3 text-[18px]">Certificate 0{fields.length + 1}</h4>

      <button
        type="button"
        className="mb-3 rounded bg-gray-800/[.8] px-2 py-1 text-gray-200"
        onClick={appendField}
      >
        Add Certificate
      </button>
    </OnboardingForm>
  );
}

export default UploadCertificatesForm;
