import React from "react";
import AuthForm from "../Forms/AuthForm";
import SetupAccountForm from "../Forms/SetupAccountForm";
import SetupAccountForm2 from "../Forms/SetupAccountForm2";
import OtpForm from "../Forms/OtpForm";
import { GlobalContext } from "../../App";

const AuthHome = () => {
  const [formData, setFormData] = React.useState({ role: "member" });
  const [displayType, setDisplayType] = React.useState("setup-account-2");
  // display type: root, otp, setup-account, setup-account-2

  const { setUserData } = React.useContext(GlobalContext);

  const handleInput = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const handleFormSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((result) => {
          const user = result.data.user;
          setUserData(user);
          if (user.accountSetupRequired) {
            setDisplayType("setup-account");
          }
        });
    },
    [formData, setUserData]
  );

  return (
    <>
      {displayType === "root" && (
        <AuthForm
          handleInput={handleInput}
          handleFormSubmit={handleFormSubmit}
        />
      )}

      {displayType === "otp" && <OtpForm formData={formData} />}

      {displayType === "setup-account" && (
        <SetupAccountForm formData={formData} handleInput={handleInput} />
      )}

      {displayType === "setup-account-2" && (
        <SetupAccountForm2 formData={formData} handleInput={handleInput} />
      )}
    </>
  );
};

export default AuthHome;
