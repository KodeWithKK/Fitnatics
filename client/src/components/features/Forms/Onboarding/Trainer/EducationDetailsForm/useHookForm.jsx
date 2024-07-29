import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import educationDetailsSchema from "./validator";

function useHookForm({ tEducationalDetails }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(educationDetailsSchema),
    mode: "onChange",
    defaultValues: tEducationalDetails,
  });

  return {
    register,
    handleSubmit,
    control,
    errors,
  };
}

export default useHookForm;
