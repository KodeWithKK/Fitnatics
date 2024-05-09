import React from "react";
import AuthForm from "../Forms/AuthForm";
import SetupAccountForm from "../Forms/SetupAccountForm";
import PricingForm from "../Forms/PricingForm";
import OtpForm from "../Forms/OtpForm";
import { makeOTPRequest } from "../../api/api";
import { GlobalContext } from "../../context/GlobalContextProvider";

const AuthHome = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    role: "member",
  });
  const [otpGeneratedAt, setOtpGeneratedAt] = React.useState(new Date());
  const [display, setDisplay] = React.useState("root");
  // display type: root, otp, setup-account, pricing

  const handleInput = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const { addToast } = React.useContext(GlobalContext);

  const resendOTPHandler = React.useCallback(() => {
    makeOTPRequest(formData?.email, formData?.password);
    const nextOtpGeneratedAt = new Date();
    setOtpGeneratedAt(nextOtpGeneratedAt);
    addToast("info", "OTP Resended!", "A new OTP is sent to your email");
  }, [formData, addToast]);

  const rootFormSubmitHandler = React.useCallback(
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
        .then(async (result) => {
          if (result.success) {
            if (result.data?.accountSetupRequired) {
              setDisplay("setup-account");
            }
          } else {
            const error = result.message.error;

            if (error?.title == "User doesn't exist!") {
              await makeOTPRequest(formData?.email, formData?.password);
              const nextOtpGeneratedAt = new Date();
              setOtpGeneratedAt(nextOtpGeneratedAt);
              setDisplay("otp");
            }
          }
        });
    },
    [formData]
  );

  return (
    <>
      {display === "root" && (
        <AuthForm
          formData={formData}
          handleInput={handleInput}
          formSubmitHandler={rootFormSubmitHandler}
        />
      )}

      {display === "otp" && (
        <OtpForm
          formData={formData}
          otpGeneratedAt={otpGeneratedAt}
          setDisplay={setDisplay}
          resendOTPHandler={resendOTPHandler}
        />
      )}

      {display === "setup-account" && (
        <SetupAccountForm formData={formData} handleInput={handleInput} />
      )}

      {display === "pricing" && <PricingForm formData={formData} />}
    </>
  );
};

export default AuthHome;
