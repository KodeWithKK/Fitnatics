import React from "react";
import * as yup from "yup";

yup.setLocale({
  string: {
    email: "Enter a valid email",
    required: "This field is Required",
  },
});

const FormInput = ({ label, type, name, onChange, ...delegated }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const id = React.useId();

  const changeHandler = React.useCallback(
    async (e) => {
      onChange(e);
      const value = e.target.value;
      let errorMessage = null;

      if (type === "text") {
        const schema = yup.string();
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "Enter a valid text";
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
      } else if (type === "number" && name === "phoneno") {
        const schema = yup
          .number()
          .positive()
          .integer()
          .min(1000000000)
          .max(9999999999);
        const isValid = await schema.isValid(value);

        if (!isValid) {
          errorMessage = "A 10 digit number is required";
        }
      }

      if (errorMessage && value.length > 0) {
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("");
      }
    },
    [type, name, onChange]
  );

  return (
    <>
      <label
        className="block mb-0.5 text-[15px] text-gray-400 select-none"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full text-[15px] rounded-md bg-gray-950 border-gray-600/[.6] focus:border-brand focus:ring-brand placeholder:text-gray-400/[.4]`}
        name={name}
        type={type}
        onChange={changeHandler}
        {...delegated}
      />
      <p className="mt-1 mb-3 text-red-400/[.8] text-sm">{errorMessage}</p>
    </>
  );
};

export default FormInput;
