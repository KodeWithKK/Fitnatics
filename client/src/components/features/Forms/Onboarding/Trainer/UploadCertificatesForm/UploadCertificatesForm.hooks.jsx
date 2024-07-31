import { useCallback, useContext } from "react";
import useHookForm from "./useHookForm";
import { GlobalContext } from "@context/GlobalContextProvider";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";

function useUploadCertificatesFormHooks() {
  const { addToast } = useContext(GlobalContext);
  const { setStep, tCertificates, setTCertificates } =
    useContext(OnboardingContext);

  const {
    control,
    errors,
    fields,
    register,
    handleSubmit,
    appendField,
    removeField,
  } = useHookForm({ tCertificates });

  const onSuccess = useCallback(
    (formData) => {
      if (fields.length == 0) {
        addToast(
          "warning",
          "Fitness Specific Certificates Required!",
          "Upload atleast one fitness specific certficate to continue",
        );
      } else {
        setTCertificates(formData.certificates);
        setStep((prev) => ++prev);
      }
    },
    [fields, setTCertificates, setStep, addToast],
  );
  const onError = useCallback(
    (error) => {
      if (error?.certificates) {
        const hasUploadFileError =
          error.certificates.filter((fields) => fields.certificate).length > 0;

        if (hasUploadFileError) {
          addToast(
            "warning",
            "Certificate Required!",
            "Upload the certificate file to continue to the next step",
          );
        }

        const hasInputFieldError =
          error.certificates.filter((fields) => !fields.certificate).length > 0;

        if (hasInputFieldError) {
          addToast(
            "error",
            "Invalid Form Data!",
            "Enter valid form data to proceed the next step",
          );
        }
      }
    },
    [addToast],
  );

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

export default useUploadCertificatesFormHooks;
