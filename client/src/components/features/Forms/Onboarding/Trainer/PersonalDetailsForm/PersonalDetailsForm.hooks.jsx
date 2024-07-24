import { useState, useContext, useCallback } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";
import useEmailVerification from "@hooks/useEmailVerification";
import useAsyncForm from "./useAsyncForm";

const usePersonalDetailsFormHooks = () => {
  const [isSubmitBtnTriggered, setIsSubmitBtnTriggered] = useState(false);

  const {
    setStep,
    isEmailVerified,
    tPersonalDetails,
    setTPersonalDetails,
    setOtpGeneratedAt,
  } = useContext(OnboardingContext);

  const { generateOTP } = useEmailVerification({ setOtpGeneratedAt });
  const { addToast } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    addOnChangeField,
    removeOnChangeField,
    control,
    errors,
    isSubmitting,
  } = useAsyncForm({ tPersonalDetails, isEmailVerified, isSubmitBtnTriggered });

  const onSuccess = useCallback(
    async (formData) => {
      setIsSubmitBtnTriggered(false);

      if (!isEmailVerified) {
        await generateOTP(
          { email: formData?.email },
          {
            onSuccess: () => {
              setTPersonalDetails(formData);
              setStep((prevStep) => ++prevStep);
            },
          },
        );
      } else {
        setTPersonalDetails(formData);
        setStep((prevStep) => ++prevStep);
      }
    },
    [
      isEmailVerified,
      setTPersonalDetails,
      setStep,
      generateOTP,
      setIsSubmitBtnTriggered,
    ],
  );

  const onError = useCallback(
    (error) => {
      setIsSubmitBtnTriggered(false);

      const errorValues = Object.values(error);
      let hasOneOfError = false;

      for (const errorValue of errorValues) {
        if (errorValue.type === "oneOf") {
          hasOneOfError = true;
          break;
        }
      }

      if (hasOneOfError) {
        addToast(
          "warning",
          "All Fields are Required!",
          "All Fields are Required to proceed the next step",
        );
      } else if (error?.avatar) {
        addToast(
          "warning",
          "Profile Picture Required!",
          "Profile picture is required to proceed the next step",
        );
      } else {
        addToast(
          "error",
          "Invalid Form Data!",
          "Enter valid form data to proceed the next step",
        );
      }
    },
    [addToast, setIsSubmitBtnTriggered],
  );

  return {
    errors,
    control,
    isEmailVerified,
    isSubmitting,
    addOnChangeField,
    removeOnChangeField,
    setIsSubmitBtnTriggered,
    handleSubmit: handleSubmit(onSuccess, onError),
    register,
  };
};

export default usePersonalDetailsFormHooks;
