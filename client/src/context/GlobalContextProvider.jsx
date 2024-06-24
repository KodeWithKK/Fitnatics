import { useState, useCallback, useMemo, createContext } from "react";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [loaderText, setLoaderText] = useState("Loading...");
  const [isRazorpayScriptLoaded, setIsRazorpayScriptLoaded] = useState(false);

  const addToast = useCallback((type, title, message) => {
    setToasts((prevToasts) => {
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

  const displayLoaderWithText = useCallback((text) => {
    if (text) setLoaderText(text);
    else setLoaderText("");
    setDisplayLoader(true);
  }, []);

  const hideLoader = useCallback(() => {
    setDisplayLoader(false);
  }, []);

  const value = useMemo(() => {
    return {
      toasts,
      loaderText,
      displayLoaderState: displayLoader,
      isRazorpayScriptLoaded,
      addToast,
      removeToast,
      setIsRazorpayScriptLoaded,
      hideLoader,
      displayLoader: displayLoaderWithText,
    };
  }, [
    toasts,
    loaderText,
    displayLoader,
    isRazorpayScriptLoaded,
    addToast,
    removeToast,
    hideLoader,
    displayLoaderWithText,
  ]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
