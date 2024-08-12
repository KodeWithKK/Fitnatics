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

      <div className="mb-3 space-y-3">
        <Input
          type="text"
          {...register("name")}
          spellCheck="false"
          label="Name"
          placeholder="John Doe"
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
          error={errors?.phoneno?.message}
          required={true}
        />

        <Input
          type="text"
          {...register("dob")}
          spellCheck="false"
          label={"DOB"}
          placeholder="DOB (DD/MM/YYYY)"
          error={errors?.dob?.message}
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
              label="Gender"
              placeholder={"Select Gender"}
            >
              <Select.Option value="male" label="Male" />
              <Select.Option value="female" label="Female" />
            </Select>
          )}
        />

        <div className="flex gap-3">
          <Input
            type="number"
            {...register("height")}
            spellCheck="false"
            label="Height"
            placeholder="Height (Xcm)"
            error={errors?.height?.message}
            required={true}
          >
            <Input.RAside>cm</Input.RAside>
          </Input>

          <Input
            type="number"
            {...register("weight")}
            spellCheck="false"
            label="Weight"
            placeholder="Weight (YKg)"
            error={errors?.weight?.message}
            required={true}
          >
            <Input.RAside>Kg</Input.RAside>
          </Input>
        </div>

        <Controller
          name="workoutExperience"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              label="Workout Experience"
              placeholder={"Select Workout Experience"}
            >
              <Select.Option value="beginner" label="Beginner" />
              <Select.Option value="intermediate" label="Intermediate" />
              <Select.Option value="advanced" label="Advanced" />
            </Select>
          )}
        />
      </div>
    </OnboardingForm>
  );
};

export default PersonalDetailsForm;
