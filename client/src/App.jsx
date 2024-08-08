import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useFetchUserData } from "@hooks/useFetchUserData";
import ToastStackLayout from "@layouts/ToastStackLayout/ToastStackLayout";
import LoadingScreen from "@shared/core/Loaders/LoadingScreen";
import AppRoutes from "@routes/AppRoutes";

// insperation - https://mywowfit.com/

function App() {
  const { isLoading, user } = useFetchUserData();
  const { toasts, removeToast } = useContext(GlobalContext);

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-gray-975 font-sans text-base font-normal leading-[1.6] text-gray-100">
      <ToastStackLayout toasts={toasts} removeToast={removeToast} />
      <LoadingScreen />
      <CashfreeSkelton />

      <AppRoutes user={user} />
    </div>
  );
}

function CashfreeSkelton() {
  return (
    <div className="fixed left-0 top-0 z-[10000000] flex w-full">
      <div id="cf_checkout" className="mx-auto"></div>
    </div>
  );
}

export default App;
