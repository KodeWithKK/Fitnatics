import { useState, useCallback, useContext, useEffect } from "react";
import {
  checkName,
  checkPhoneNo,
  checkDOB,
  checkHeight,
  checkWeight,
  isFormDataValid,
} from "./memberErrorCheckers";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useQueryClient } from "@tanstack/react-query";

const useMemberPersonalDetailFormHooks = ({ data, addData }) => {
  const [formData, setFormData] = useState({ ...data });
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const user = queryClient.getQueryData(["user"]);

    if (user && !formData?.avatar) {
      (async () => {
        try {
          const response = await fetch(user?.avatar);
          const blob = await response.blob();
          const filename = `user-profile-${window.crypto.randomUUID()}`;
          const file = new File([blob], filename, { type: blob.type });
          handleOnChange({ name: "avatar", value: file });
        } catch (err) {
          console.log(err.message);
        }
      })();
    }
  }, [queryClient, formData, handleOnChange]);

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

export { useMemberPersonalDetailFormHooks };
