import { useContext, useCallback } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";
import useEmailVerification from "@hooks/useEmailVerification";
import useMemberAsyncForm from "./useMemberAsyncForm";

const useMemberPersonalDetailFormHooks = () => {
  const {
    setStep,
    isEmailVerified,
    memberData,
    setMemberData,
    setOtpGeneratedAt,
  } = useContext(GettingStartedContext);

  const { generateOTP } = useEmailVerification({ setOtpGeneratedAt });
  const { addToast } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    addOnChangeField,
    removeOnChangeField,
    setIsSubmitBtnTriggered,
    control,
    errors,
    isSubmitting,
  } = useMemberAsyncForm({ memberData, isEmailVerified });

  const onSuccess = useCallback(
    async (formData) => {
      if (!isEmailVerified) {
        await generateOTP(
          { email: formData?.email },
          {
            onSuccess: () => {
              setMemberData(formData);
              setStep((prevStep) => ++prevStep);
            },
          }
        );
        setIsSubmitBtnTriggered(false);
      } else {
        setMemberData(formData);
        setIsSubmitBtnTriggered(false);
        setStep((prevStep) => ++prevStep);
      }
    },
    [
      isEmailVerified,
      setMemberData,
      setStep,
      generateOTP,
      setIsSubmitBtnTriggered,
    ]
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
          "error",
          "All Fields are Required!",
          "All Fields are Required to proceed the next step"
        );
      } else if (error?.avatar) {
        addToast(
          "warning",
          "Profile Picture Required!",
          "Profile picture is required to proceed the next step"
        );
      } else {
        addToast(
          "error",
          "Invalid Form Data!",
          "Enter valid form data to proceed the next step"
        );
      }
    },
    [addToast, setIsSubmitBtnTriggered]
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

export { useMemberPersonalDetailFormHooks };
