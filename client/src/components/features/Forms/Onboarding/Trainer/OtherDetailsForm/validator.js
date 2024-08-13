import * as yup from "yup";

const otherProfessionalDetailsSchema = yup.object({
  areaOfExpertice: yup
    .array()
    .of(
      yup
        .string()
        .oneOf(
          [
            "Nutrition Training",
            "Yoga",
            "Zumba",
            "Calesthenics",
            "Cardio Training",
            "Functional Training",
            "Strength Training",
            "High-intensity interval training (HIIT)",
            "Pre and Post-natal Training",
            "Injury Rehab",
          ],
          "Area of Expertise is Required!",
        )
        .required("Area of Expertise is Required!"),
    ),
  languageSpoken: yup.array().of(
    yup.object({
      type: yup.string().oneOf(["text", "select"]).required(),
      name: yup.string().required("Language Required!"),
      fluency: yup
        .string()
        .required("Fluency Required!")
        .oneOf(["Basic", "Intermediate", "Fluent"], "Fluency Required!"),
    }),
  ),
  preferedWorkShedule: yup
    .string()
    .required("Prefered Work Schedule is Required!")
    .oneOf(
      [
        "Full-Time",
        "Part-Time",
        "Weekends Only",
        "Early Mornings (5am - 9am)",
        "Daytime (9am - 5pm)",
        "Evenings (5pm - 10pm)",
        "Flexible/Variable",
      ],
      "Prefered Work Schedule is Required!",
    ),
  whyFitnatics: yup.string().required("Why Fitnatics is required!"),
});

export default otherProfessionalDetailsSchema;
