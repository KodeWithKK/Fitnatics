import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useFetchUserData } from "@hooks/useFetchUserData";
import ToastStackLayout from "@layouts/ToastStackLayout/ToastStackLayout";
import LoadingScreen from "@shared/core/Loaders/LoadingScreen";
import AppRoutes from "@routes/AppRoutes";

function App() {
  const { isLoading, user } = useFetchUserData();
  const { toasts, removeToast } = useContext(GlobalContext);

  if (isLoading) {
    return null;
  }

  return (
    <div className="bg-gray-975 font-normal font-sans text-base text-gray-100 leading-[1.6]">
      <ToastStackLayout toasts={toasts} removeToast={removeToast} />
      <LoadingScreen />
      <CashfreeSkelton />

      <AppRoutes user={user} />
    </div>
  );
}

function CashfreeSkelton() {
  return (
    <div className="top-0 left-0 z-[10000000] fixed flex w-full">
      <div id="cf_checkout" className="mx-auto"></div>
    </div>
  );
}

export default App;
