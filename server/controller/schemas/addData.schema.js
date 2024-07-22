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

const dietDayObjectSchema = yup.object({
  name: yup.string().required(),
  calories: yup.number().positive().required(),
  fat: yup.number().positive().required(),
  protein: yup.number().positive().required(),
  carbs: yup.number().positive().required(),
});

const dietDaySchema = yup.object({
  breakfast: dietDayObjectSchema,
  lunch: dietDayObjectSchema,
  pre_workout: dietDayObjectSchema,
  post_workout: dietDayObjectSchema,
  dinner: dietDayObjectSchema,
});

const dietSchema = yup.array().of(
  yup.object({
    bmi: yup.string().typeError().required(),
    category: yup
      .string()
      .oneOf([
        "underweight",
        "normal-weight",
        "overweight",
        "obese",
        "obese-class-2",
      ])
      .required(),
    workoutExperience: yup
      .string()
      .oneOf(["beginner", "intermediate", "advanced"])
      .required(),
    type: yup.string().oneOf(["vegetarian", "non-vegetarian"]),
    chart: yup.object({
      monday: dietDaySchema,
      tuesday: dietDaySchema,
      wednesday: dietDaySchema,
      thursday: dietDaySchema,
      friday: dietDaySchema,
      saturday: dietDaySchema,
      sunday: dietDaySchema,
    }),
  })
);

const workoutSchema = yup.object({
  name: yup.string().required(),
  sets: yup.number().positive().required(),
  reps: yup.number().positive().required(),
  repsUnit: yup.string().oneOf(["number", "secs", "mins"]).required(),
  rest: yup.number().required(),
  caloriesBurned: yup.number().positive().required(),
});

const workoutChartSchema = yup.array().of(
  yup.object({
    bmi: yup.string().required(),
    category: yup
      .string()
      .oneOf([
        "underweight",
        "normal-weight",
        "overweight",
        "obese",
        "obese-class-2",
      ])
      .required(),
    workoutExperience: yup
      .string()
      .oneOf(["beginner", "intermediate", "advanced"])
      .required(),
    chart: yup.array().of(
      yup.object({
        day: yup
          .string()
          .oneOf([
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ])
          .required(),
        dayType: yup.string().required(),
        timeRequired: yup.number().required(),
        exercises: yup.array().of(workoutSchema),
      })
    ),
  })
);

export { membershipPlanSchema, dietSchema, workoutChartSchema };
