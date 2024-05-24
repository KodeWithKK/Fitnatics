import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePostRequest } from "@api/api";
import { GlobalContext } from "@context/GlobalContextProvider";

const useAuthPageHooks = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "member",
  });
  const [otpGeneratedAt, setOtpGeneratedAt] = useState(new Date());
  const [display, setDisplay] = useState("root");
  // root || otp || setup-account || pricing

  const { addToast } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const userData = useMemo(() => {
    return queryClient.getQueryState(["user"])?.data;
  }, [queryClient]);

  useEffect(() => {
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

  const handleInput = useCallback(
    (event) => {
      const { name, value } = event.target;
      const nextFormData = { ...formData, [name]: value };
      setFormData(nextFormData);
    },
    [formData]
  );

  const resendOTPHandler = useCallback(() => {
    generateOTP();
    addToast("info", "OTP Resended!", "A new OTP is sent to your email");
  }, [generateOTP, addToast]);

  return {
    display,
    formData,
    otpGeneratedAt,
    handleInput,
    setDisplay,
    resendOTPHandler,
  };
};

export { useAuthPageHooks };
