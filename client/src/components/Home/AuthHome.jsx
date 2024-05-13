import React from "react";
import * as yup from "yup";
import AuthForm from "../Forms/AuthForm";
import SetupAccountForm from "../Forms/SetupAccountForm";
import PricingForm from "../Forms/PricingForm";
import OtpForm from "../Forms/OtpForm";
import { makeLocalLoginRequest, makeOTPRequest } from "../../api/api";
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

  const { addToast } = React.useContext(GlobalContext);

  const handleInput = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const resendOTPHandler = React.useCallback(() => {
    const data = { email: formData?.email, password: formData?.password };
    makeOTPRequest(data);
    const nextOtpGeneratedAt = new Date();
    setOtpGeneratedAt(nextOtpGeneratedAt);
    addToast("info", "OTP Resended!", "A new OTP is sent to your email");
  }, [formData, addToast]);

  const rootFormSubmitHandler = React.useCallback(
    async (e) => {
      e.preventDefault();

      const loginData = {
        email: formData?.email,
        password: formData?.password,
      };

      const isValid = await rootFormSchema.isValid(loginData);

      if (!isValid) {
        addToast(
          "error",
          "Enter valid form data",
          "Enter valid form data to continue with email"
        );
      } else {
        const { data, error } = await makeLocalLoginRequest(loginData);

        if (data) {
          if (data?.accountSetupRequired) {
            setDisplay("setup-account");
          }
        }

        if (error) {
          if (error?.title == "User doesn't exist!") {
            await makeOTPRequest(data);
            const nextOtpGeneratedAt = new Date();
            setOtpGeneratedAt(nextOtpGeneratedAt);
            setDisplay("otp");
          } else {
            addToast("error", error.title, error.message);
          }
        }
      }
    },
    [formData, addToast]
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

const rootFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export default AuthHome;
