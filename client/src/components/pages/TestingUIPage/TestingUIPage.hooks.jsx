import { useCallback } from "react";
import useHookForm from "./useHookForm";

function useTestingUIPageHooks() {
  const {
    control,
    errors,
    languageSpokenFields,
    register,
    handleSubmit,
    appendSelectLanguage,
    appendOtherLanguage,
    removeLanguage,
  } = useHookForm();

  const onSuccess = useCallback((formData) => {
    console.log(formData);
  }, []);
  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  return {
    control,
    errors,
    languageSpokenFields,
    register,
    handleSubmit: handleSubmit(onSuccess, onError),
    appendSelectLanguage,
    appendOtherLanguage,
    removeLanguage,
  };
}

export default useTestingUIPageHooks;
