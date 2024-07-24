import { useState, useCallback, useMemo, createContext } from "react";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [displayLoaderState, setDisplayLoaderState] = useState(false);
  const [loaderText, setLoaderText] = useState("Loading...");

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
    [toasts],
  );

  const displayLoader = useCallback((text) => {
    if (text) setLoaderText(text);
    else setLoaderText("");
    setDisplayLoaderState(true);
  }, []);

  const hideLoader = useCallback(() => {
    setDisplayLoaderState(false);
  }, []);

  const value = useMemo(() => {
    return {
      toasts,
      loaderText,
      displayLoaderState,
      addToast,
      removeToast,
      displayLoader,
      hideLoader,
    };
  }, [
    toasts,
    loaderText,
    displayLoaderState,
    addToast,
    removeToast,
    displayLoader,
    hideLoader,
  ]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
