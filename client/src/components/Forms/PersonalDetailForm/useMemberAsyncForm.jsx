import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { getFileFromUrl } from "@utils/getFileFromUrl";
import useMemberValidator from "./useMemberValidator";

function useMemberAsyncForm({ memberData, isEmailVerified }) {
  const [onChangeFields, setOnChangeFields] = useState([]);
  const [isSubmitBtnTriggered, setIsSubmitBtnTriggered] = useState(false);
  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  const verifiedFields = useMemo(() => {
    if (isEmailVerified) return ["email"];
    else return [];
  }, [isEmailVerified]);

  const { memberPersonalDetailSchema } = useMemberValidator({
    onChangeFields,
    verifiedFields,
    isSubmitBtnTriggered,
  });

  const addOnChangeField = useCallback((value) => {
    setOnChangeFields((prevFields) => {
      if (prevFields.includes(value)) return prevFields;
      else return [...prevFields, value];
    });
  }, []);

  const removeOnChangeField = useCallback((value) => {
    setOnChangeFields((prevFields) =>
      prevFields.filter((field) => field != value)
    );
  }, []);

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

  return {
    register,
    handleSubmit,
    addOnChangeField,
    removeOnChangeField,
    setIsSubmitBtnTriggered,
    control,
    errors,
    isSubmitBtnTriggered,
    isSubmitting,
  };
}

export default useMemberAsyncForm;
