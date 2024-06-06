import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { memberPersonalDetailSchema } from "./memberValidators";
import { useQueryClient } from "@tanstack/react-query";
import { GlobalContext } from "@context/GlobalContextProvider";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";
import { getFileFromUrl } from "@utils/getFileFromUrl";

const useMemberPersonalDetailFormHooks = ({
  memberPersonalData,
  setMemberPersonalData,
}) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { setStep } = useContext(GettingStartedContext);
  const { addToast } = useContext(GlobalContext);

  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  useEffect(() => {
    if (user?.email) {
      setIsEmailVerified(true);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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

  const onSuccess = useCallback(
    (formData) => {
      setMemberPersonalData(formData);
      setStep((prevStep) => ++prevStep);
    },
    [setMemberPersonalData, setStep]
  );

  const onError = useCallback(
    (error) => {
      console.log(error);
      if (error?.gender?.message || error?.workoutExperience?.message) {
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
    isEmailVerified,
    errors,
    control,
    register,
    handleSubmit: handleSubmit(onSuccess, onError),
  };
};

export { useMemberPersonalDetailFormHooks };
