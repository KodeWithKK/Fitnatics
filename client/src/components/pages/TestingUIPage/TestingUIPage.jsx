import Input from "@shared/base/Input/Input";
import Select from "@shared/base/Select/Select";
import useTestingUIPageHooks from "./TestingUIPage.hooks";
import { Controller } from "react-hook-form";

function TestingUIPage() {
  const { control, errors, register } = useTestingUIPageHooks();

  return (
    <form className="flex min-h-screen">
      <div className="mx-auto w-[564px] p-6 pb-2">
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
              <Select.Option
                value="Nutrition Training"
                label="Nutrition Training"
              />
              <Select.Option value="Yoga" label="Yoga" />
              <Select.Option value="Zumba" label="Zumba" />
              <Select.Option value="Calesthenics" label="Calesthenics" />
              <Select.Option value="Cardio Training" label="Cardio Training" />
              <Select.Option
                value="Functional Training"
                label="Functional Training"
              />
              <Select.Option
                value="Strength Training"
                label="Strength Training"
              />
              <Select.Option
                value="High-intensity interval training (HIIT)"
                label="High-intensity interval training (HIIT)"
              />
              <Select.Option
                value="Pre and Post-natal Training"
                label="Pre and Post-natal Training"
              />
              <Select.Option value="Injury Rehab" label="Injury Rehab" />
            </Select>
          )}
        />

        <Input
          type="text"
          {...register(`workExperiences.jobTitle`)}
          spellCheck="false"
          label="Area of Expertise"
          placeholder="Enter Area of Expertise"
          className={"border-gray-900/[.8]"}
          error={errors?.workExperiences?.[0]?.jobTitle?.message}
          required={true}
        />

        <Input
          type="text"
          {...register(`workExperiences.gymOrStudioName`)}
          spellCheck="false"
          label="Specialized Equipment Proficency"
          placeholder="Enter Specialized Equipment Proficency"
          className={"border-gray-900/[.8]"}
          error={errors?.workExperiences?.[0]?.gymOrStudioName?.message}
          required={true}
        />

        <button
          type="submit"
          className="fixed bottom-5 right-5 h-10 w-10 rounded-full bg-blue-500"
        >
          S
        </button>
      </div>
    </form>
  );
}

export default TestingUIPage;
