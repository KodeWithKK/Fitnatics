import { useContext, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { memberPersonalDetailSchema } from "./memberValidators";
import { useQueryClient } from "@tanstack/react-query";
import { GlobalContext } from "@context/GlobalContextProvider";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";
import { getFileFromUrl } from "@utils/getFileFromUrl";
import { fromStatus } from "./memberValidators";

const useMemberPersonalDetailFormHooks = () => {
  const {
    setStep,
    isEmailVerified,
    setIsFormRequestPending,
    memberPersonalData,
    setMemberPersonalData,
  } = useContext(GettingStartedContext);

  const { addToast } = useContext(GlobalContext);

  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(memberPersonalDetailSchema),
    mode: "onChange",
    defaultValues: async () => {
      const data = { ...memberPersonalData };
      data.avatar = data?.avatar ?? (await getFileFromUrl(user?.avatar)) ?? "";
      data.name = data?.name ?? user?.name ?? "";
      data.email = data?.email ?? user?.email ?? "";

      Object.keys(data).forEach((key) => {
        data[key] ??= "";
      });

      return data;
    },
  });

  useEffect(() => {
    if (isSubmitting) setIsFormRequestPending(true);
  }, [isSubmitting, setIsFormRequestPending]);

  const onSuccess = useCallback(
    async (formData) => {
      setIsFormRequestPending(false);
      fromStatus.isSubmitting = false;
      setMemberPersonalData(formData);
      setStep((prevStep) => ++prevStep);
    },
    [setStep, setMemberPersonalData, setIsFormRequestPending]
  );

  const onError = useCallback(
    (error) => {
      fromStatus.isSubmitting = false;
      setIsFormRequestPending(false);

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
    [addToast, setIsFormRequestPending]
  );

  return {
    errors,
    control,
    isEmailVerified,
    handleSubmit: handleSubmit(onSuccess, onError),
    register,
  };
};

export { useMemberPersonalDetailFormHooks };
