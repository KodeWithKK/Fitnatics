import AvatarImage from "./AvatarImage";
import Input from "@components/comman/Input/Input";
import Select from "@components/comman/Select/Select";

const PersonalDetailForm = ({ setDisplayStep }) => {
  return (
    <form className="mx-auto p-6 max-w-[480px] text-center">
      <AvatarImage width="172px" height="172px" />

      <div className="mt-6">
        <Input
          type="text"
          name="name"
          spellCheck="false"
          placeholder="Name"
          className={"border-gray-900"}
        />
        <Input
          type="number"
          name="phoneno"
          spellCheck="false"
          placeholder="Phone Number"
          className={"border-gray-900"}
        />
        <Input
          type="text"
          name="dob"
          spellCheck="false"
          placeholder="DOB (DD/MM/YYYY)"
          className={"border-gray-900"}
        />

        <Select
          name="gender"
          borderColor="border-gray-900"
          placeholder={"Select Gender"}
        >
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>

        <div className="flex gap-2">
          <Input
            type="text"
            name="height"
            spellCheck="false"
            placeholder="Height (in cm)"
            className={"border-gray-900"}
          />

          <Input
            type="text"
            name="weight"
            spellCheck="false"
            placeholder="Weight (in Kg)"
            className={"border-gray-900"}
          />
        </div>

        <Select
          name="workoutExperience"
          borderColor="border-gray-900"
          placeholder={"Select Workout Experience"}
        >
          <Select.Option value="beginner">Beginner</Select.Option>
          <Select.Option value="intermediate">Intermediate</Select.Option>
          <Select.Option value="advanced">Advanced</Select.Option>
        </Select>
      </div>

      <div className="flex justify-end gap-2.5 mt-6">
        <button
          type="button"
          className="bg-gray-800 px-2.5 py-2 rounded-md w-full"
          onClick={() => setDisplayStep(1)}
        >
          Go Back
        </button>
        <button
          type="button"
          className="bg-brand px-2.5 py-2 rounded-md w-full"
          onClick={() => setDisplayStep(3)}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailForm;
