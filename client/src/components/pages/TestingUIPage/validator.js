import * as yup from "yup";

const workExperienceFormSchema = yup.object({
  areaOfExpertice: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          "nutrition training",
          "yoga",
          "zumba",
          "calisthenics",
          "cardio training",
          "functional training",
          "strength training",
          "hiit",
          "pre-and-post-natal training",
          "injury rehab",
        ])
        .required(),
    ),
  languageSpoken: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          "hindi",
          "english",
          "bengali",
          "telugu",
          "marathi",
          "tamil",
          "urdu",
          "gujarati",
          "kannada",
          "odia",
          "malayalam",
          "punjabi",
        ])
        .required(),
    ),
  preferedWorkShedule: yup
    .array()
    .of(
      yup
        .string()
        .oneOf([
          "full-time",
          "part-time",
          "weekends only",
          "early mornings (5am-9am)",
          "daytime (9am-5pm)",
          "evenings (5pm-10pm)",
          "flexible/variable",
        ])
        .required(),
    ),
  whyFitnatics: yup.string().required(),
});

export default workExperienceFormSchema;
