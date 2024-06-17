import { GlobalContext } from "@context/GlobalContextProvider";
import { useContext, useEffect, useRef, useCallback, useMemo } from "react";
import { loadScript } from "@utils/loadScript";
import apiClient from "@api/apiClient";

const RenderRazorpay = ({
  orderId,
  productName,
  amount,
  currency,
  setDisplayRazorpay,
}) => {
  const { addToast, isRazorpayScriptLoaded, setIsRazorpayScriptLoaded } =
    useContext(GlobalContext);

  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  const isInitialized = useRef();

  // To load razorpay checkout modal script.
  const displayRazorpayWindow = useCallback(
    async (options) => {
      if (!isInitialized.current) isInitialized.current = true;
      else return;

      if (!isRazorpayScriptLoaded) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          console.log("Razorpay SDK failed to load. Are you online?");
          return;
        }
        setIsRazorpayScriptLoaded(true);
      }

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
    [isRazorpayScriptLoaded, setIsRazorpayScriptLoaded]
  );

  // filling up options
  const options = useMemo(() => {
    return {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount,
      currency,
      order_id: orderId,
      name: "Fitnatic",
      description: "Test Mode",
      image: import.meta.env.VITE_LOGO_URL,
      handler: async (response) => {
        try {
          await apiClient.post(
            import.meta.env.VITE_BACKEND_API_BASE + "/payment/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          setDisplayRazorpay(false);

          addToast(
            "success",
            "Payment Successful!",
            `${productName} bought for ₹${Math.trunc(amount / 100)}`
          );
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#1271ed",
      },
    };
  }, [addToast, amount, currency, orderId, productName, setDisplayRazorpay]);

  useEffect(() => {
    displayRazorpayWindow(options);
  }, [displayRazorpayWindow, options]);
};

export default RenderRazorpay;
