import AvatarImage from "./AvatarImage";
import Input from "@components/comman/Input/Input";
import Select from "@components/comman/Select/Select";
import GettingStartedLayout from "@layouts/GettingStartedLayout/GettingStartedLayout";
import { useMemberPersonalDetailFormHooks } from "./MemberPersonalDetailForm.hooks";

import {
  MemberIcon,
  PhoneIcon,
  DOBIcon,
  GenderIcon,
  MaleIcon,
  FemaleIcon,
  HeightIcon,
  WeightIcon,
  ExperienceIcon,
  BeginnerIcon,
  IntermediateIcon,
  AdvancedIcon,
} from "./Icons";

const MemberPersonalDetailForm = ({ data, addData }) => {
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
  } = useMemberPersonalDetailFormHooks({ data, addData });

  return (
    <GettingStartedLayout.Form
      onSubmit={submitHandler}
      stepTitle="Step 01 - Enter your personal details"
    >
      <div className="mx-auto p-6 pb-2 max-w-[516px]">
        <div className="flex justify-center mb-4">
          <AvatarImage
            name="avatar"
            width="172px"
            height="172px"
            file={formData?.avatar ?? ""}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <Input
            type="text"
            name="name"
            Icon={MemberIcon}
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
            Icon={PhoneIcon}
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
            Icon={DOBIcon}
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
            Icon={GenderIcon}
          >
            <Select.Option value="male" Icon={MaleIcon}>
              Male
            </Select.Option>
            <Select.Option value="female" Icon={FemaleIcon}>
              Female
            </Select.Option>
          </Select>

          <div className="flex gap-2">
            <Input
              type="number"
              name="height"
              Icon={HeightIcon}
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
              Icon={WeightIcon}
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
            Icon={ExperienceIcon}
          >
            <Select.Option value="beginner" Icon={BeginnerIcon}>
              Beginner
            </Select.Option>
            <Select.Option value="intermediate" Icon={IntermediateIcon}>
              Intermediate
            </Select.Option>
            <Select.Option value="advanced" Icon={AdvancedIcon}>
              Advanced
            </Select.Option>
          </Select>
        </div>
      </div>
    </GettingStartedLayout.Form>
  );
};

export default MemberPersonalDetailForm;
