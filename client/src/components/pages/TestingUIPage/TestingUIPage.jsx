import Input from "@shared/base/Input/Input";
import TextArea from "@shared/base/TextArea/TextArea";
import useTestingUIPageHooks from "./TestingUIPage.hooks";

import { CircledCrossIcon, UpArrowIcon } from "@shared/icons/FormIcons";

function TestingUIPage() {
  const { errors, fields, register, handleSubmit, appendField, removeField } =
    useTestingUIPageHooks();

  return (
    <form className="flex min-h-screen">
      <div className="mx-auto w-[564px] p-6 pb-2">
        {fields.map((field, idx) => (
          <div key={field.id}>
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
              label="Area of Expertise"
              placeholder="Enter Area of Expertise"
              className={"border-gray-900/[.8]"}
              error={errors?.workExperiences?.[idx]?.jobTitle?.message}
              required={true}
            />
            <Input
              type="text"
              {...register(`workExperiences.${idx}.gymOrStudioName`)}
              spellCheck="false"
              label="Specialized Equipment Proficency"
              placeholder="Enter Specialized Equipment Proficency"
              className={"border-gray-900/[.8]"}
              error={errors?.workExperiences?.[idx]?.gymOrStudioName?.message}
              required={true}
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
