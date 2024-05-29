import React from "react";

export const GlobalContext = React.createContext();

function GlobalContextProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((type, title, message) => {
    setToasts((prevToasts) => {
      // Access the current state with prevToasts
      return [
        ...prevToasts,
        { id: window.crypto.randomUUID(), type, title, message },
      ];
    });
  }, []);

  const removeToast = React.useCallback(
    (id) => {
      const nextToast = toasts.filter((toast) => toast.id !== id);
      setToasts(nextToast);
    },
    [toasts]
  );

  const value = React.useMemo(() => {
    return {
      toasts,
      addToast,
      removeToast,
    };
  }, [toasts, addToast, removeToast]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
