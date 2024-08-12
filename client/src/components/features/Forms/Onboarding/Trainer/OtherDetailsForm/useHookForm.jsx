import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import otherProfessionalDetailsSchema from "./validator";
import { useCallback } from "react";

function useHookForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otherProfessionalDetailsSchema),
    mode: "onChange",
    defaultValues: {
      languageSpoken: [{ type: "select", name: "", fluency: "" }],
    },
  });

  const {
    fields: languageSpokenFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languageSpoken",
  });

  const appendSelectLanguage = useCallback(() => {
    appendLanguage({ type: "select", name: "", fluency: "" });
  }, [appendLanguage]);

  const appendOtherLanguage = useCallback(() => {
    appendLanguage({ type: "text", name: "", fluency: "" });
  }, [appendLanguage]);

  return {
    control,
    errors,
    languageSpokenFields,
    register,
    handleSubmit,
    appendSelectLanguage,
    appendOtherLanguage,
    removeLanguage,
  };
}

export default useHookForm;
