import * as yup from "yup";
import dayjs from "dayjs";

const workExperienceFormSchema = yup.object({
  workExperiences: yup.array().of(
    yup.object({
      jobTitle: yup
        .string()
        .matches(/^[a-zA-Z,.() ]*$/, "Job title has some invalid characters")
        .required("Job title is required"),

      gymOrStudioName: yup
        .string()
        .matches(
          /^[a-zA-Z0-9,.() ]*$/,
          "Gym/Studio name has some invalid characters",
        )
        .required("Gym/Studio name is required"),

      employedFrom: yup
        .string()
        .required("Employed-from date is required")
        .test(
          "IsValidDate",
          "Enter a valid date (DD/MM/YYYY)",
          function (dateString) {
            const isValidDate = dayjs(dateString, "DD/MM/YYYY", true).isValid();
            const isPastDate = dayjs(dateString, "DD/MM/YYYY").isBefore(
              dayjs(),
            );

            return isValidDate && isPastDate;
          },
        ),

      employedTo: yup
        .string()
        .test(
          "IsValidDDate",
          "Enter a valid date (DD/MM/YYYY)",
          function (dateString) {
            if (!dateString) return true;
            const isValidDate = dayjs(dateString, "DD/MM/YYYY", true).isValid();
            const isPastDate = dayjs(dateString, "DD/MM/YYYY").isBefore(
              dayjs(),
            );

            return isValidDate && isPastDate;
          },
        )
        .test(
          "isFutureDate",
          "Employed-to date must come after the Employed-from date",
          function (dateString) {
            if (!dateString) return true;
            const isValidDate = dayjs(dateString, "DD/MM/YYYY", true).isValid();
            const isPastDate = dayjs(dateString, "DD/MM/YYYY").isBefore(
              dayjs(),
            );
            const employedFromDate = this.parent.employedFrom;
            const isEmployedFromDateValid = dayjs(
              employedFromDate,
              "DD/MM/YYYY",
              true,
            ).isValid();

            if (isValidDate && isPastDate && isEmployedFromDateValid) {
              return dayjs(dateString, "DD/MM/YYYY").isAfter(
                dayjs(employedFromDate, "DD/MM/YYYY", true),
              );
            }

            return true;
          },
        ),

      breifJobDescription: yup
        .string()
        .matches(
          /^[a-zA-Z,.() ]*$/,
          "Job description has some invalid characters",
        )
        .required("A breif job description is required!"),
    }),
  ),
});

export default workExperienceFormSchema;
