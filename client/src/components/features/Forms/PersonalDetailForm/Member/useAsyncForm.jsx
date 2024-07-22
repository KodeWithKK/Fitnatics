import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getFileFromUrl } from "@utils/getFileFromUrl";
import useMemberValidator from "./useValidator";

function useAsyncForm({ memberData, isEmailVerified, isSubmitBtnTriggered }) {
  const [onChangeFields, setOnChangeFields] = useState([]);

  const verifiedFields = useMemo(() => {
    if (isEmailVerified) return ["email"];
    else return [];
  }, [isEmailVerified]);

  const { personalDetailSchema } = useMemberValidator({
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
    resolver: yupResolver(personalDetailSchema),
    mode: "onChange",
    defaultValues: async () => {
      const data = { ...memberData };

      if (typeof data.avatar === "string") {
        data.avatar = await getFileFromUrl(data?.avatar);
      }

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
    control,
    errors,
    isSubmitBtnTriggered,
    isSubmitting,
  };
}

export default useAsyncForm;
