import apiClient from "@api/apiClient";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

function useEmailVerification({ setOtpGeneratedAt }) {
  const { addToast } = useContext(GlobalContext);

  const { isPending: isOtpGenerationPending, mutate: generateOTP } =
    useMutation({
      mutationFn: async ({ email }) => {
        await apiClient.post(
          import.meta.env.VITE_BACKEND_API_BASE + "/auth/strategy-verify-email",
          { email }
        );
      },
      onMutate: () => {
        setOtpGeneratedAt(null);
      },
      onSuccess: () => {
        if (setOtpGeneratedAt) {
          const nextOtpGeneratedAt = new Date();
          setOtpGeneratedAt(nextOtpGeneratedAt);
        }
      },
      onError: (error) => {
        addToast("error", error?.title, error?.message);
      },
    });

  const { isPending: isOTPVerificationPending, mutate: verifyOTP } =
    useMutation({
      mutationFn: async ({ email, otp }) => {
        return await apiClient.get(
          import.meta.env.VITE_BACKEND_API_BASE + "/auth/strategy-verify-email",
          { email, otp }
        );
      },
      onError: (error) => {
        addToast("error", error?.title, error?.message);
      },
    });

  return {
    isOtpGenerationPending,
    isOTPVerificationPending,
    generateOTP,
    verifyOTP,
  };
}

export default useEmailVerification;
