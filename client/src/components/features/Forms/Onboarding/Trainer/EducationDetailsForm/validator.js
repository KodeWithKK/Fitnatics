import * as yup from "yup";

const educationDetailsSchema = yup.object({
  highestQualification: yup
    .string()
    .matches(/^[a-zA-Z()., ]*$/, "Enter a valid Highest Qualification")
    .required("Highest Qualification is Required"),

  institutionName: yup
    .string()
    .matches(/^[a-zA-Z()., ]*$/, "Enter a valid Institution Name")
    .required("Institution Name is Required"),

  yearOfCompletion: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .min(1950, "Enter a valid Year of Completion")
    .max(
      new Date().getFullYear(),
      "We are asking for the highest education obtained not in process",
    )
    .required("Year of Completion is Required"),

  marksheet: yup.mixed().required(),
});

export default educationDetailsSchema;
