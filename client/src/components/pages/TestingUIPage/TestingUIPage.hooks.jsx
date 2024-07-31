import { useCallback } from "react";
import useHookForm from "./useHookForm";

function useTestingUIPageHooks() {
  const {
    control,
    errors,
    fields,
    register,
    handleSubmit,
    appendField,
    removeField,
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
    fields,
    register,
    handleSubmit: handleSubmit(onSuccess, onError),
    appendField,
    removeField,
  };
}

export default useTestingUIPageHooks;
