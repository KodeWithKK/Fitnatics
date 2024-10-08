import Input from "@shared/base/Input/Input";
import Select from "@shared/base/Select/Select";
import TextArea from "@shared/base/TextArea/TextArea";
import { Controller } from "react-hook-form";
import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import useOtherDetailsFormHooks from "./OtherDetailsForm.hooks";
import cn from "@utils/cn";

import { CircledCrossIcon } from "@shared/icons/FormIcons";

function OtherDetailsForm() {
  const {
    control,
    errors,
    languageSpokenFields,
    register,
    handleSubmit,
    appendSelectLanguage,
    appendOtherLanguage,
    removeLanguage,
  } = useOtherDetailsFormHooks();

  return (
    <OnboardingForm
      className="mx-auto max-w-[564px] space-y-3 p-6 pb-2"
      onSubmit={handleSubmit}
    >
      <OnboardingForm.Headline className={"mb-4"} />

      <Controller
        name={`areaOfExpertice`}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            type="checkbox"
            label="Area of Expertise"
            placeholder={"Select Area of Expertise"}
          >
            <Select.Option label="Nutrition Training" />
            <Select.Option label="Yoga" />
            <Select.Option label="Zumba" />
            <Select.Option label="Calesthenics" />
            <Select.Option label="Cardio Training" />
            <Select.Option label="Functional Training" />
            <Select.Option label="Strength Training" />
            <Select.Option label="High-intensity interval training (HIIT)" />
            <Select.Option label="Pre and Post-natal Training" />
            <Select.Option label="Injury Rehab" />
          </Select>
        )}
      />

      <div>
        <div className="mb-1 flex gap-2 text-sm text-gray-300">
          <span className="w-full">Language Spoken</span>
          <span className={"w-full"}>Fluency</span>
          <span
            className={cn(
              "w-[62px]",
              languageSpokenFields.length === 1 && "hidden",
            )}
          ></span>
        </div>

        {languageSpokenFields.map((field, idx) => (
          <div key={field.id} className="mb-2 flex items-start gap-2">
            <div className="w-full">
              {field.type === "select" && (
                <Controller
                  name={`languageSpoken.${idx}.name`}
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={"Select Language"}
                      error={errors?.languageSpoken?.[idx]?.name?.message}
                    >
                      <Select.Option label="Hindi" />
                      <Select.Option label="English" />
                      <Select.Option label="Bengali" />
                      <Select.Option label="Telugu" />
                      <Select.Option label="Marathi" />
                      <Select.Option label="Tamil" />
                      <Select.Option label="Urdu" />
                      <Select.Option label="Gujarati" />
                      <Select.Option label="Kannada" />
                      <Select.Option label="Odia" />
                      <Select.Option label="Malayalam" />
                      <Select.Option label="Punjabi" />
                      <Select.Option label="Other" />
                    </Select>
                  )}
                />
              )}

              {field.type === "text" && (
                <Input
                  type="text"
                  {...register(`languageSpoken.${idx}.name`)}
                  spellCheck="false"
                  placeholder="Enter Other Language"
                  error={errors?.languageSpoken?.[idx]?.name?.message}
                  required={true}
                />
              )}
            </div>

            <Controller
              name={`languageSpoken.${idx}.fluency`}
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={"Select Fluency"}
                  error={errors?.languageSpoken?.[idx]?.fluency?.message}
                >
                  <Select.Option label="Basic" />
                  <Select.Option label="Intermediate" />
                  <Select.Option label="Fluent" />
                </Select>
              )}
            />

            {languageSpokenFields.length > 1 && (
              <button
                type="button"
                className="h-[42px]"
                onClick={() => removeLanguage(idx)}
              >
                <CircledCrossIcon className="h-7 w-7 text-gray-600 hover:text-gray-100" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="space-x-2">
        <TextButton onClick={appendSelectLanguage}>Add Language</TextButton>
        <TextButton onClick={appendOtherLanguage}>
          Add Other Language
        </TextButton>
      </div>

      <Controller
        name={`preferedWorkShedule`}
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            label="Preferred Schedule"
            placeholder={"Select Prefered Schedule"}
            error={errors?.preferedWorkShedule?.message}
          >
            <Select.Option label="Full-Time"></Select.Option>
            <Select.Option label="Weekends Only"></Select.Option>
            <Select.Option label="Early Mornings (5am - 9am)"></Select.Option>
            <Select.Option label="Daytime (9am - 5pm)"></Select.Option>
            <Select.Option label="Evenings (5pm - 10pm)"></Select.Option>
            <Select.Option label="Flexible/Variable"></Select.Option>
          </Select>
        )}
      />

      <TextArea
        {...register("whyFitnatics")}
        label="Why Fitnatics?"
        placeholder="Tell us why you want to join the Fitnatics!"
        required={true}
        error={errors?.whyFitnatics?.message}
      />
    </OnboardingForm>
  );
}

function TextButton({ onClick, children }) {
  return (
    <button
      type="button"
      className="rounded text-sm text-gray-300 underline underline-offset-[2.2px] hover:text-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default OtherDetailsForm;
