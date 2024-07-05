import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";

const useApiMutation = ({ role, data }) => {
  const { addToast, hideLoader, displayLoader } = useContext(GlobalContext);

  const { isPending, mutate: setupAccountHandler } = useMutation({
    mutationFn: async ({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }) => {
      if (role === "member") {
        await apiClient.post(
          import.meta.env.VITE_BACKEND_API_BASE + "/user/setup-account",
          {
            role,
            ...data?.memberData,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
          "multipart/form-data"
        );
      } else {
        await apiClient.post(
          import.meta.env.VITE_BACKEND_API_BASE + "/user/setup-account",
          {
            role,
            ...data?.trainerData,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          },
          "multipart/form-data"
        );
      }
    },
    onMutate: () => {
      displayLoader("Redirecting to Dashboard...");
    },
    onSuccess: () => {
      window.location.href = import.meta.env.VITE_FRONTEND_URL + "/dashboard";
    },
    onError: (error) => {
      hideLoader();
      addToast("error", error?.title, error?.message);
    },
  });

  return { isSetupAccountPending: isPending, setupAccountHandler };
};

export default useApiMutation;
