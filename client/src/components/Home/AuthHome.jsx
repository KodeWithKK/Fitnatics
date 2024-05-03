import React from "react";
import AuthForm from "../Forms/AuthForm";
import SetupAccountForm from "../Forms/SetupAccountForm";
import PricingForm from "../Forms/PricingForm";
import OtpForm from "../Forms/OtpForm";
import { GlobalContext } from "../../App";

const AuthHome = () => {
  const [formData, setFormData] = React.useState({ role: "member" });
  const [displayType, setDisplayType] = React.useState("pricing");
  // display type: root, otp, setup-account, pricing

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

      {displayType === "pricing" && <PricingForm formData={formData} />}
    </>
  );
};

export default AuthHome;
