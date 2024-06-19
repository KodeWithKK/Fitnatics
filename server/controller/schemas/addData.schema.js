import * as yup from "yup";

const membershipPlanSchema = yup
  .array()
  .of(
    yup.object({
      duration: yup
        .number()
        .typeError("Duration must be a number")
        .required("Duration Required"),
      orgPrice: yup
        .number()
        .typeError("Original Price must be a number")
        .required("Original Price Required"),
      currPrice: yup
        .number()
        .typeError("Current Price must be a number")
        .required("Current Price Required"),
      features: yup.array().of(yup.string()),
    })
  )
  .required();

export { membershipPlanSchema };
