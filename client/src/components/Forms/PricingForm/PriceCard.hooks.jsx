import { useCallback, useContext, useState } from "react";
import useCreateOrder from "@hooks/useCreateOrder";
import { GlobalContext } from "@context/GlobalContextProvider";

const usePriceCardHooks = ({ planId, type }) => {
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const { createOrder, orderData, isPending } = useCreateOrder({
    productId: planId,
    orderType: type,
  });

  const { addToast } = useContext(GlobalContext);

  const handleBuyButtonClick = useCallback(async () => {
    await createOrder({
      onError: (error) => {
        addToast("error", error?.title, error?.message);
      },
    });
    setDisplayRazorpay(true);
  }, [createOrder, addToast]);

  return {
    isPending,
    orderData,
    displayRazorpay,
    handleBuyButtonClick,
    setDisplayRazorpay,
  };
};

export { usePriceCardHooks };
