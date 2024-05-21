import React from "react";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePostRequest } from "../../api/api";
import { GlobalContext } from "../../context/GlobalContextProvider";
import AuthForm from "../Forms/AuthForm";
import SetupAccountForm from "../Forms/SetupAccountForm";
import PricingForm from "../Forms/PricingForm";
import OtpForm from "../Forms/OtpForm";

const AuthHome = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    role: "member",
  });
  const [otpGeneratedAt, setOtpGeneratedAt] = React.useState(new Date());
  const [display, setDisplay] = React.useState("root");
  // root || otp || setup-account || pricing

  const { addToast } = React.useContext(GlobalContext);
  const queryClient = useQueryClient();

  const userData = React.useMemo(() => {
    return queryClient.getQueryState(["user"])?.data;
  }, [queryClient]);

  React.useEffect(() => {
    console.log(userData);
    if (userData) {
      setDisplay("setup-account");
    }
  }, [userData]);

  const { mutate: generateOTP } = useMutation({
    mutationFn: async () => {
      const data = await makePostRequest(
        "http://localhost:8000/api/v1/auth/generate-otp",
        {
          email: formData?.email,
          password: formData?.password,
        }
      );
      return data;
    },
    onSuccess: () => {
      const nextOtpGeneratedAt = new Date();
      setOtpGeneratedAt(nextOtpGeneratedAt);
    },
    onError: (error) => {
      addToast("error", error?.title, error?.message);
    },
  });

  const handleInput = React.useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const resendOTPHandler = React.useCallback(() => {
    generateOTP();
    addToast("info", "OTP Resended!", "A new OTP is sent to your email");
  }, [generateOTP, addToast]);

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
          "Invalid form data!",
          "Enter valid form data to continue with email"
        );
      } else {
        try {
          await makePostRequest(
            "http://localhost:8000/api/v1/auth/login-local",
            loginData
          );
          setDisplay("setup-account");
        } catch (err) {
          if (err?.title == "User doesn't exist!") {
            await generateOTP();
            setDisplay("otp");
          } else {
            addToast("error", err.title, err.message);
          }
        }
      }
    },
    [formData, addToast, generateOTP]
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
