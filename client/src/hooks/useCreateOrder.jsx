import { GlobalContext } from "@context/GlobalContextProvider";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import { useContext } from "react";

function useCreateOrder({ productId, orderType }) {
  const { addToast } = useContext(GlobalContext);

  const {
    data,
    isPending,
    mutate: createOrder,
  } = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post(
        import.meta.env.VITE_BACKEND_API_BASE + "/payment/create-order",
        { productId, orderType }
      );
      return res;
    },
    onError: (error) => {
      addToast("error", error?.title, error?.message);
    },
  });

  return { orderData: data, isPending, createOrder };
}

export default useCreateOrder;
