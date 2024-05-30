import { useState, useCallback, useContext } from "react";
import {
  checkName,
  checkPhoneNo,
  checkDOB,
  checkHeight,
  checkWeight,
  isFormDataValid,
} from "./errorCheckers";
import { GlobalContext } from "@context/GlobalContextProvider";

const usePersonalDetailFormHooks = ({ data, addData }) => {
  const [formData, setFormData] = useState({ ...data });
  const { addToast } = useContext(GlobalContext);

  const handleInput = useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const handleOnChange = useCallback(
    ({ name, value }) => {
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const submitHandler = async (moveNextStep) => {
    if (!formData?.avatar) {
      addToast(
        "warning",
        "Profile Picture Required!",
        "Profile picture is required to proceed the next step"
      );
      return;
    }

    if (!(await isFormDataValid(formData))) {
      addToast(
        "error",
        "Invalid Form Data!",
        "Enter valid form data to proceed the next step"
      );
      return;
    }

    if (formData?.avatar && (await isFormDataValid(formData))) {
      console.log(formData);
      addData({ value: formData });
      moveNextStep();
    }
  };

  return {
    formData,
    checkName,
    checkPhoneNo,
    checkDOB,
    checkHeight,
    checkWeight,
    handleInput,
    handleOnChange,
    submitHandler,
  };
};

export { usePersonalDetailFormHooks };
