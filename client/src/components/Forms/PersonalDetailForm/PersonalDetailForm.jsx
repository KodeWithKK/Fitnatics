import AvatarImage from "./AvatarImage";
import Input from "@components/comman/Input/Input";
import Select from "@components/comman/Select/Select";
import { usePersonalDetailFormHooks } from "./PersonalDetalForm.hooks";

const PersonalDetailForm = ({ setStep, data, addData }) => {
  const {
    formData,
    checkName,
    checkPhoneNo,
    checkDOB,
    checkHeight,
    checkWeight,
    handleInput,
    handleOnChange,
    submitHandler,
  } = usePersonalDetailFormHooks({ setStep, data, addData });

  return (
    <form className="mx-auto p-6 max-w-[480px]" onSubmit={submitHandler}>
      <div className="flex justify-center">
        <AvatarImage
          name="avatar"
          width="172px"
          height="172px"
          url={formData?.avatar ?? ""}
          onChange={handleOnChange}
        />
      </div>

      <div className="mt-4">
        <Input
          type="text"
          name="name"
          spellCheck="false"
          placeholder="Name"
          className={"border-gray-900"}
          onInput={handleInput}
          checkError={checkName}
          value={formData?.name ?? ""}
          required={true}
        />
        <Input
          type="number"
          name="phoneno"
          spellCheck="false"
          placeholder="Phone Number"
          className={"border-gray-900"}
          onInput={handleInput}
          checkError={checkPhoneNo}
          value={formData?.phoneno ?? ""}
          required={true}
        />
        <Input
          type="text"
          name="dob"
          spellCheck="false"
          placeholder="DOB (DD/MM/YYYY)"
          className={"border-gray-900"}
          onInput={handleInput}
          checkError={checkDOB}
          value={formData?.dob ?? ""}
          required={true}
        />

        <Select
          name="gender"
          commonClass="border-gray-900"
          placeholder={"Select Gender"}
          onChange={handleOnChange}
          value={formData?.gender ?? ""}
        >
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>

        <div className="flex gap-2">
          <Input
            type="number"
            name="height"
            spellCheck="false"
            placeholder="Height"
            className={"border-gray-900"}
            onInput={handleInput}
            checkError={checkHeight}
            value={formData?.height ?? ""}
            required={true}
          >
            <Input.RAside>cm</Input.RAside>
          </Input>

          <Input
            type="number"
            name="weight"
            spellCheck="false"
            placeholder="Weight"
            className={"border-gray-900"}
            onInput={handleInput}
            checkError={checkWeight}
            value={formData?.weight ?? ""}
            required={true}
          >
            <Input.RAside>Kg</Input.RAside>
          </Input>
        </div>

        <Select
          name="workoutExperience"
          commonClass="border-gray-900"
          placeholder={"Select Workout Experience"}
          onChange={handleOnChange}
          value={formData?.workoutExperience ?? ""}
        >
          <Select.Option value="beginner">Beginner</Select.Option>
          <Select.Option value="intermediate">Intermediate</Select.Option>
          <Select.Option value="advanced">Advanced</Select.Option>
        </Select>
      </div>

      <div className="flex justify-end gap-2.5 mt-4 select-none">
        <button
          type="button"
          className="bg-gray-800 px-2.5 py-2 rounded-md w-full"
          onClick={() => setStep(1)}
        >
          Go Back
        </button>
        <button
          type="submit"
          className="bg-brand px-2.5 py-2 rounded-md w-full"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailForm;
