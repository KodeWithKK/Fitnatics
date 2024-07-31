import * as yup from "yup";
import dayjs from "dayjs";

const uploadCertificatesSchema = yup.object({
  certificates: yup.array().of(
    yup.object({
      nameOfCertification: yup
        .string()
        .matches(
          /^[a-zA-Z,.() ]*$/,
          "Name of certification has some invalid characters",
        )
        .required("Name of certification is required"),

      certifyingBody: yup
        .string()
        .matches(
          /^[a-zA-Z,.() ]*$/,
          "Certification body has some invalid characters",
        ),

      certifiationDate: yup
        .string()
        .required("Certification date is required")
        .test(
          "IsValidDate",
          "Enter a valid certification date (DD/MM/YYYY)",
          (dateString) => {
            const isValidDob = dayjs(dateString, "DD/MM/YYYY", true).isValid();
            const isPastDate = dayjs(dateString, "DD/MM/YYYY").isBefore(
              dayjs(),
            );
            return isValidDob && isPastDate;
          },
        ),

      expirationDate: yup
        .string()
        .test(
          "IsValidDDate",
          "Enter a valid expiration date (DD/MM/YYYY)",
          (dateString) => {
            if (!dateString) return true;
            const isValidDob = dayjs(dateString, "DD/MM/YYYY", true).isValid();
            const isFutureDate = dayjs(dateString, "DD/MM/YYYY").isAfter(
              dayjs(),
            );
            return isValidDob && isFutureDate;
          },
        ),

      certificate: yup.mixed().required(),
    }),
  ),
});

export default uploadCertificatesSchema;
