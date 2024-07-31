import { useCallback, useContext } from "react";
import useHookForm from "./useHookForm";
import { GlobalContext } from "@context/GlobalContextProvider";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";

function useWorkExperienceFormHooks() {
  const { addToast } = useContext(GlobalContext);
  const { setStep, tWorkExperiences, setTWorkExperiences } =
    useContext(OnboardingContext);

  const {
    control,
    errors,
    fields,
    register,
    handleSubmit,
    appendField,
    removeField,
  } = useHookForm({ tWorkExperiences });

  const onSuccess = useCallback(
    (formData) => {
      setTWorkExperiences(formData.workExperiences);
      setStep((prev) => ++prev);
    },
    [setTWorkExperiences, setStep],
  );
  const onError = useCallback(() => {
    addToast(
      "error",
      "Invalid Form Data!",
      "Enter valid form data to proceed the next step",
    );
  }, [addToast]);

  return {
    control,
    errors,
    fields,
    register,
    handleSubmit: handleSubmit(onSuccess, onError),
    appendField,
    removeField,
  };
}

export default useWorkExperienceFormHooks;
