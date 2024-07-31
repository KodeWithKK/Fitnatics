import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import uploadCertificatesSchema from "./validator";
import { useCallback } from "react";

function useHookForm({ tCertificates }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(uploadCertificatesSchema),
    mode: "onChange",
    defaultValues: {
      certificates: tCertificates,
    },
  });

  const {
    fields,
    append,
    remove: removeField,
  } = useFieldArray({
    control,
    name: "certificates",
  });

  const appendField = useCallback(() => {
    append({
      nameOfCertification: "",
      certifyingBody: "",
      certifiationDate: "",
      expirationDate: "",
      certificate: null,
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
