import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import workExperienceFormSchema from "./validator";
import { useCallback } from "react";

function useHookForm({ tWorkExperiences }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(workExperienceFormSchema),
    mode: "onChange",
    defaultValues: {
      workExperiences: tWorkExperiences,
    },
  });

  const {
    fields,
    append,
    remove: removeField,
  } = useFieldArray({
    control,
    name: "workExperiences",
  });

  const appendField = useCallback(() => {
    append({
      jobTitle: "",
      gymOrStudioName: "",
      employedFrom: "",
      employedTo: "",
      breifJobDescription: "",
    });
  }, [append]);

  return {
    control,
    errors,
    fields,
    register,
    handleSubmit,
    appendField,
    removeField,
  };
}

export default useHookForm;
