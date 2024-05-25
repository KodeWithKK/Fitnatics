import { useState, useCallback } from "react";
import * as yup from "yup";

yup.setLocale({
  string: {
    email: "Enter a valid email",
    required: "This field is Required",
  },
});

function useInputHooks({ type, onInput, name }) {
  const [errorMessage, setErrorMessage] = useState("");

  const inputHandler = useCallback(
    async (e) => {
      onInput(e);
      const value = e.target.value;
      let errorMessage = null;

      if (type === "text") {
        const schema = yup.string();
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "Enter a valid text";
        }
      } else if (type === "number") {
        const schema = yup.string().matches(/^[0-9]+$/);
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "Enter a valid number";
        }
      } else if (type === "email") {
        const schema = yup.string().email();
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "Enter a valid email";
        }
      } else if (type === "password") {
        const schema = yup.string().min(8);
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "Password must contain at least 8 characters";
        }
      }

      if (name === "phoneno") {
        const schema = yup.string().matches(/^[0-9]{10}$/);
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "A valid 10 digit number is required";
        }
      } else if (name === "otp") {
        const schema = yup.string().matches(/^[0-9]{6}$/);
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "A valid 6 digit OTP is required";
        }
      }

      if (errorMessage && value.length > 0) {
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("");
      }
    },
    [type, name, onInput]
  );

  return { errorMessage, inputHandler };
}

export { useInputHooks };
