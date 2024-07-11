import { GlobalContext } from "@context/GlobalContextProvider";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import { useRef, useState, useCallback, useContext } from "react";
import { loadScript } from "@utils/loadScript";

function useMakePayment({ productId, productType, callbackFn }) {
  const [isScriptLoading, setIsScriptLoading] = useState(false);

  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  const {
    addToast,
    hideLoader,
    displayLoader,
    isRazorpayScriptLoaded,
    setIsRazorpayScriptLoaded,
  } = useContext(GlobalContext);

  const { isPending: isCreateOrderPending, mutate: createOrder } = useMutation({
    mutationFn: async () => {
      const data = await apiClient.post(
        import.meta.env.VITE_BACKEND_API_BASE + "/payment/create-order",
        { productId, productType }
      );
      return data;
    },
    onMutate: () => {
      displayLoader("Redirecting you to Payment Gateway...");
    },
    onError: (error) => {
      hideLoader();
      addToast("error", error?.title, error?.message);
    },
  });

  const buyButtonHandler = useCallback(async () => {
    await createOrder(
      {},
      {
        onSuccess: async (data) => {
          const { orderId, amount, currency } = data;

          if (!isRazorpayScriptLoaded) {
            setIsScriptLoading(true);
            const res = await loadScript(
              "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!res) {
              console.log("Razorpay SDK failed to load. Are you online?");
              return;
            }
            setIsRazorpayScriptLoaded(true);
            setIsScriptLoading(false);
          }

          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount,
            currency,
            order_id: orderId,
            name: "Fitnatic",
            description: "Test Mode",
            image: import.meta.env.VITE_LOGO_URL,
            handler: async (response) => {
              await callbackFn({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
            },
            theme: {
              color: "#1271ed",
            },
          };

          const rzp1 = new window.Razorpay(options);

          // retreive the chosen payment method.
          rzp1.on("payment.submit", (response) => {
            paymentMethod.current = response.method;
          });

          // in case transaction failed.
          rzp1.on("payment.failed", (response) => {
            paymentId.current = response.error.metadata.payment_id;
          });

          // open razorpay checkout modal.
          rzp1.open();
        },
      }
    );
  }, [
    isRazorpayScriptLoaded,
    setIsRazorpayScriptLoaded,
    createOrder,
    callbackFn,
  ]);

  return {
    isPending: isCreateOrderPending || isScriptLoading,
    buyButtonHandler,
  };
}

export default useMakePayment;
