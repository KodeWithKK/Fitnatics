import AvatarImage from "./AvatarImage";
import Input from "@components/_comman/Input/Input";
import Select from "@components/_comman/Select/Select";
import ErrorMessage from "../_comman/ErrorMessage";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
import { useMemberPersonalDetailFormHooks } from "./MemberPersonalDetailForm.hooks";
import { Controller } from "react-hook-form";
import { fromStatus } from "./memberValidators";

import {
  MemberIcon,
  EmailIcon,
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

const MemberPersonalDetailForm = () => {
  const { errors, control, isEmailVerified, register, handleSubmit } =
    useMemberPersonalDetailFormHooks();

  return (
    <SteperLayout.Form
      onSubmit={handleSubmit}
      onSubmitButtonClick={() => {
        fromStatus.isSubmitting = true;
      }}
    >
      <div className="mx-auto p-6 pb-2 max-w-[516px]">
        <div className="flex justify-center mb-4">
          <Controller
            name="avatar"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <AvatarImage
                file={field.value}
                onChange={field.onChange}
                width="172px"
                height="172px"
              />
            )}
          />
        </div>

        <div>
          <Input
            type="text"
            {...register("name")}
            Icon={MemberIcon}
            spellCheck="false"
            placeholder="Name"
            className={"border-gray-900"}
            hasError={errors?.name?.message}
            required={true}
          />

          <ErrorMessage>{errors?.name?.message}</ErrorMessage>

          <Input
            type="email"
            {...register("email", {
              onBlur: () => {
                fromStatus.onChange = null;
                fromStatus.isSubmitting = false;
              },
            })}
            Icon={EmailIcon}
            spellCheck="false"
            placeholder="Email"
            className={"border-gray-900"}
            hasError={errors?.email?.message}
            disabled={isEmailVerified}
            onInput={() => {
              fromStatus.onChange = "email";
            }}
            required={true}
          />

          <ErrorMessage>{errors?.email?.message}</ErrorMessage>

          <Input
            type="number"
            {...register("phoneno")}
            Icon={PhoneIcon}
            spellCheck="false"
            placeholder="Phone Number"
            className={"border-gray-900"}
            hasError={errors?.phoneno?.message}
            required={true}
          />

          <ErrorMessage>{errors?.phoneno?.message}</ErrorMessage>

          <Input
            type="text"
            {...register("dob")}
            Icon={DOBIcon}
            spellCheck="false"
            placeholder="DOB (DD/MM/YYYY)"
            className={"border-gray-900"}
            hasError={errors?.dob?.message}
            required={true}
          />

          <ErrorMessage>{errors?.dob?.message}</ErrorMessage>

          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                Icon={GenderIcon}
                commonClass="border-gray-900"
                placeholder={"Select Gender"}
              >
                <Select.Option Icon={MaleIcon} value="male" label="Male" />
                <Select.Option
                  Icon={FemaleIcon}
                  value="female"
                  label="Female"
                />
              </Select>
            )}
          />

          <div className="flex gap-2">
            <div>
              <Input
                type="number"
                {...register("height")}
                Icon={HeightIcon}
                spellCheck="false"
                placeholder="Height"
                className={"border-gray-900"}
                hasError={errors?.height?.message}
                required={true}
              >
                <Input.RAside>cm</Input.RAside>
              </Input>

              <ErrorMessage>{errors?.height?.message}</ErrorMessage>
            </div>

            <div>
              <Input
                type="number"
                {...register("weight")}
                Icon={WeightIcon}
                spellCheck="false"
                placeholder="Weight"
                className={"border-gray-900"}
                hasError={errors?.weight?.message}
                required={true}
              >
                <Input.RAside>Kg</Input.RAside>
              </Input>

              <ErrorMessage>{errors?.weight?.message}</ErrorMessage>
            </div>
          </div>

          <Controller
            name="workoutExperience"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                Icon={ExperienceIcon}
                commonClass="border-gray-900"
                placeholder={"Select Workout Experience"}
              >
                <Select.Option
                  Icon={BeginnerIcon}
                  value="beginner"
                  label="Beginner"
                />
                <Select.Option
                  Icon={IntermediateIcon}
                  value="intermediate"
                  label="Intermediate"
                />
                <Select.Option
                  Icon={AdvancedIcon}
                  value="advanced"
                  label="Advanced"
                />
              </Select>
            )}
          />
        </div>
      </div>
    </SteperLayout.Form>
  );
};

export default MemberPersonalDetailForm;
