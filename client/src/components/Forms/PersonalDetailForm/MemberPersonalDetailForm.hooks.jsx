import { useContext, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { memberPersonalDetailSchema } from "./memberValidators";
import { useQueryClient } from "@tanstack/react-query";
import { GlobalContext } from "@context/GlobalContextProvider";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";
import { getFileFromUrl } from "@utils/getFileFromUrl";
import { fromStatus } from "./memberValidators";
import useEmailVerification from "@hooks/useEmailVerification";

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
      const data = { ...memberData };
      data.avatar = data?.avatar ?? (await getFileFromUrl(user?.avatar)) ?? "";
      data.name = data?.name ?? user?.name ?? "";
      data.email = data?.email ?? user?.email ?? "";

      Object.keys(data).forEach((key) => {
        data[key] ??= "";
      });

      return data;
    },
  });

  // useEffect(() => {}, [isSubmitting, setIsFormRequestPending]);

  useEffect(() => {
    isEmailVerified && fromStatus.verifiedFields.push("email");
  }, [isEmailVerified]);

  const onSuccess = useCallback(
    async (formData) => {
      if (!isEmailVerified) {
        await generateOTP(
          { email: formData?.email },
          {
            onSuccess: () => {
              setMemberData(formData);
              setStep((prevStep) => ++prevStep);
              fromStatus.verifiedFields.push("email");
            },
          }
        );
        fromStatus.isSubmitting = false;
      } else {
        setMemberData(formData);
        fromStatus.isSubmitting = false;
        setStep((prevStep) => ++prevStep);
      }
    },
    [isEmailVerified, setMemberData, setStep, generateOTP]
  );

  const onError = useCallback(
    (error) => {
      fromStatus.isSubmitting = false;

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
    [addToast]
  );

  return {
    errors,
    control,
    isEmailVerified,
    isSubmitting,
    handleSubmit: handleSubmit(onSuccess, onError),
    register,
  };
};

export { useMemberPersonalDetailFormHooks };
