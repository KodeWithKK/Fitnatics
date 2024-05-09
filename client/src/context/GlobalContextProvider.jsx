import React from "react";

export const GlobalContext = React.createContext();

function GlobalContextProvider({ children }) {
  const [userData, setUserData] = React.useState({});
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(
    (type, title, message) => {
      const nextToast = [
        ...toasts,
        { id: window.crypto.randomUUID(), type, title, message },
      ];
      setToasts(nextToast);
    },
    [toasts]
  );

  const removeToast = React.useCallback(
    (id) => {
      const nextToast = toasts.filter((toast) => toast.id !== id);
      setToasts(nextToast);
    },
    [toasts]
  );

  const value = React.useMemo(() => {
    return {
      userData,
      setUserData,
      toasts,
      addToast,
      removeToast,
    };
  }, [userData, toasts, addToast, removeToast]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
