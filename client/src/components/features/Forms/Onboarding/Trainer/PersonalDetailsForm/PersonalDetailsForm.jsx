import Input from "@shared/base/Input/Input";
import Select from "@shared/base/Select/Select";
import AvatarImage from "@shared/lib/AvatarImage/AvatarImage";
import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import usePersonalDetailsHooks from "./PersonalDetailsForm.hooks";
import { Controller } from "react-hook-form";

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
          spellCheck="false"
          label="Name"
          placeholder="John Doe"
          className={"border-gray-900/[.8]"}
          error={errors?.name?.message}
          required={true}
        />

        <Input
          type="email"
          {...register("email", {
            onBlur: () => {
              removeOnChangeField("email");
              setIsSubmitBtnTriggered(false);
            },
          })}
          spellCheck="false"
          label="Email"
          placeholder="abc@email.com"
          className={"border-gray-900/[.8]"}
          error={errors?.email?.message}
          disabled={isEmailVerified}
          onInput={() => {
            addOnChangeField("email");
          }}
          required={true}
        />

        <Input
          type="number"
          {...register("phoneno")}
          step="0"
          spellCheck="false"
          label="Phone Number"
          placeholder="Phone Number"
          className={"border-gray-900/[.8]"}
          error={errors?.phoneno?.message}
          required={true}
        />

        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              commonClass="border-gray-900/[.8]"
              label="Gender"
              placeholder={"Select Gender"}
            >
              <Select.Option value="male" label="Male" />
              <Select.Option value="female" label="Female" />
            </Select>
          )}
        />

        <Input
          type="text"
          {...register("dob")}
          spellCheck="false"
          label={"DOB"}
          placeholder="DOB (DD/MM/YYYY)"
          className={"border-gray-900/[.8]"}
          error={errors?.dob?.message}
          required={true}
        />

        <Input
          type="text"
          {...register("address")}
          spellCheck="false"
          label={"Address"}
          placeholder="Address"
          className={"border-gray-900/[.8]"}
          error={errors?.address?.message}
          required={true}
        />
      </div>
    </OnboardingForm>
  );
};

export default PersonalDetailsForm;
