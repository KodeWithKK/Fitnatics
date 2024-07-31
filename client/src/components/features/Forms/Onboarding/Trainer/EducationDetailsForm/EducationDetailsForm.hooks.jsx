import { useCallback, useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";
import useHookForm from "./useHookForm";

function useEducationalDetailsHooks() {
  const { addToast } = useContext(GlobalContext);
  const { setStep, tEducationalDetails, setTEducationalDetails } =
    useContext(OnboardingContext);

  const { register, handleSubmit, control, errors } = useHookForm({
    tEducationalDetails,
  });

  const onSuccess = useCallback(
    (formData) => {
      setStep((prev) => ++prev);
      setTEducationalDetails(formData);
    },
    [setStep, setTEducationalDetails],
  );
  const onError = useCallback(
    (error) => {
      if (error?.marksheet) {
        addToast(
          "warning",
          "Marksheet is Required!",
          "Upload marksheet to continue to the next step",
        );
      }

      if (Object.keys(error).length > 1) {
        addToast(
          "error",
          "Invalid Form Data!",
          "Enter valid form data to proceed the next step",
        );
      }
    },
    [addToast],
  );

  return {
    register,
    handleSubmit: handleSubmit(onSuccess, onError),
    control,
    errors,
  };
}

export default useEducationalDetailsHooks;
