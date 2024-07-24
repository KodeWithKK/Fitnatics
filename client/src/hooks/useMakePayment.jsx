import { useContext, useCallback, useState } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useMutation } from "@tanstack/react-query";
import { load } from "@cashfreepayments/cashfree-js";
import apiClient from "@api/apiClient";

function useMakePayment({ productId, productType, callbackFn }) {
  const [isCallbackFnPending, setIsCallbackFnPending] = useState(false);
  const [isCFGatewayLoading, setIsCFGatewayLoading] = useState(false);
  const { addToast, hideLoader, displayLoader } = useContext(GlobalContext);

  const { isPending: isCreateOrderPending, mutateAsync: createOrder } =
    useMutation({
      mutationFn: async () => {
        const res = await apiClient.post(
          import.meta.env.VITE_BACKEND_API_BASE + "/payment/create-order",
          { productId, productType },
        );
        return res;
      },
      onMutate: () => {
        displayLoader("Redirecting you to Payment Gateway...");
      },
      onError: (error) => {
        hideLoader();
        addToast("error", error?.title, error?.message);
      },
    });

  const loadCashfreeCheckout = useCallback(
    async (paymentSessionId) => {
      setIsCFGatewayLoading(true);
      displayLoader("Redirecting you to Payment Gateway...");

      let cashfree = await load({
        mode: "sandbox",
      });

      setIsCFGatewayLoading(false);

      let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };
      let paymentStatus;

      await cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.log(
            "User has closed the popup or there is some payment error, Check for Payment Status",
          );
          console.log(result.error);
          paymentStatus = "PENDING";
          hideLoader();
        }
        if (result.redirect) {
          console.log("Payment will be redirected");
          paymentStatus = "REDIRECTED";
        }
        if (result.paymentDetails) {
          // This will be called whenever the payment is completed irrespective of transaction status
          console.log("Payment has been completed, Check for Payment Status");
          console.log(result.paymentDetails.paymentMessage);
          paymentStatus = "COMPLETED";
        }
      });

      return paymentStatus;
    },
    [displayLoader, hideLoader],
  );

  const { isPending: isVerifyPaymentPending, mutate: verifyPayment } =
    useMutation({
      mutationFn: async (orderId) => {
        const res = await apiClient.post(
          import.meta.env.VITE_BACKEND_API_BASE + "/payment/verify-payment",
          { orderId },
        );
        return res;
      },
      onMutate: () => {
        displayLoader("Verifying Payment...");
      },
      onError: (error) => {
        hideLoader();
        addToast("error", error?.title, error?.message);
      },
    });

  const buyButtonHandler = useCallback(async () => {
    const orderData = await createOrder();
    if (!orderData) return;
    const { orderId, paymentSessionId } = orderData;
    const paymentStatus = await loadCashfreeCheckout(paymentSessionId);

    if (paymentStatus === "COMPLETED") {
      verifyPayment(orderId, {
        onSuccess: () => {
          setIsCallbackFnPending(true);

          callbackFn?.(orderId, {
            onSettled: () => {
              setIsCallbackFnPending(false);
            },
          });
        },
      });
    }
  }, [callbackFn, createOrder, verifyPayment, loadCashfreeCheckout]);

  return {
    isPending:
      isCreateOrderPending ||
      isVerifyPaymentPending ||
      isCFGatewayLoading ||
      isCallbackFnPending,
    buyButtonHandler,
  };
}

export default useMakePayment;
