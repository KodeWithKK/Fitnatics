import { useState, useCallback, useMemo, createContext } from "react";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [refetchFns, setRefetchFns] = useState({});
  const [isRazorpayScriptLoaded, setIsRazorpayScriptLoaded] = useState(false);

  const addToast = useCallback((type, title, message) => {
    setToasts((prevToasts) => {
      // Access the current state with prevToasts
      return [
        ...prevToasts,
        { id: window.crypto.randomUUID(), type, title, message },
      ];
    });
  }, []);

  const removeToast = useCallback(
    (id) => {
      const nextToast = toasts.filter((toast) => toast.id !== id);
      setToasts(nextToast);
    },
    [toasts]
  );

  const addRefetchFn = useCallback(({ name, fn }) => {
    setRefetchFns((prevFns) => {
      const nextFns = { ...prevFns, [name]: fn };
      return nextFns;
    });
  }, []);

  const value = useMemo(() => {
    return {
      toasts,
      refetch: refetchFns,
      isRazorpayScriptLoaded,
      addToast,
      removeToast,
      addRefetchFn,
      setIsRazorpayScriptLoaded,
    };
  }, [
    toasts,
    refetchFns,
    isRazorpayScriptLoaded,
    addToast,
    removeToast,
    addRefetchFn,
  ]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
