import Input from "@shared/base/Input/Input";
import Select from "@shared/base/Select/Select";
import AvatarImage from "@shared/lib/AvatarImage/AvatarImage";
import ErrorMessage from "@shared/lib/FormErrorMessage/ErrorMessage";
import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import usePersonalDetailsHooks from "./PersonalDetailsForm.hooks";
import { Controller } from "react-hook-form";

import {
  MemberIcon,
  EmailIcon,
  PhoneIcon,
  DOBIcon,
  GenderIcon,
  MaleIcon,
  FemaleIcon,
  AddressIcon,
} from "@shared/icons/FormIcons";

const PersonalDetailsForm = () => {
  const {
    errors,
    control,
    isEmailVerified,
    isSubmitting,
    addOnChangeField,
    removeOnChangeField,
    setIsSubmitBtnTriggered,
    handleSubmit,
    register,
  } = usePersonalDetailsHooks();

  return (
    <OnboardingForm
      className="mx-auto max-w-[564px] p-6 pb-2"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      onSubmitButtonClick={() => {
        setIsSubmitBtnTriggered(true);
      }}
    >
      <OnboardingForm.Headline className={"mb-4"} />

      <div className="mb-4 flex justify-center">
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
          className={"border-gray-900/[.5]"}
          hasError={errors?.name?.message}
          required={true}
        />

        <ErrorMessage>{errors?.name?.message}</ErrorMessage>

        <Input
          type="email"
          {...register("email", {
            onBlur: () => {
              removeOnChangeField("email");
              setIsSubmitBtnTriggered(false);
            },
          })}
          Icon={EmailIcon}
          spellCheck="false"
          placeholder="Email"
          className={"border-gray-900/[.5]"}
          hasError={errors?.email?.message}
          disabled={isEmailVerified}
          onInput={() => {
            addOnChangeField("email");
          }}
          required={true}
        />

        <ErrorMessage>{errors?.email?.message}</ErrorMessage>

        <Input
          type="number"
          {...register("phoneno")}
          Icon={PhoneIcon}
          step="0"
          spellCheck="false"
          placeholder="Phone Number"
          className={"border-gray-900/[.5]"}
          hasError={errors?.phoneno?.message}
          required={true}
        />

        <ErrorMessage>{errors?.phoneno?.message}</ErrorMessage>

        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              Icon={GenderIcon}
              commonClass="border-gray-900/[.5]"
              placeholder={"Select Gender"}
            >
              <Select.Option Icon={MaleIcon} value="male" label="Male" />
              <Select.Option Icon={FemaleIcon} value="female" label="Female" />
            </Select>
          )}
        />

        <Input
          type="text"
          {...register("dob")}
          Icon={DOBIcon}
          spellCheck="false"
          placeholder="DOB (DD/MM/YYYY)"
          className={"border-gray-900/[.5]"}
          hasError={errors?.dob?.message}
          required={true}
        />

        <ErrorMessage>{errors?.dob?.message}</ErrorMessage>

        <Input
          type="text"
          {...register("address")}
          Icon={AddressIcon}
          spellCheck="false"
          placeholder="Address"
          className={"border-gray-900/[.5]"}
          hasError={errors?.address?.message}
          required={true}
        />

        <ErrorMessage>{errors?.address?.message}</ErrorMessage>
      </div>
    </OnboardingForm>
  );
};

export default PersonalDetailsForm;
