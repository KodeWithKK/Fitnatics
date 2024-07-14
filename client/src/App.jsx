import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { useFetchUserData } from "@hooks/useFetchUserData";
import ToastStackLayout from "@layouts/ToastStackLayout";
import LoadingScreen from "@components/_atoms/Loaders/LoadingScreen";
import CashfreeSkelton from "@components/_atoms/CashfreeSkelton/CashfreeSkelton";
import AuthPage from "@pages/AuthPage/AuthPage";
import MainAppPage from "@pages/MainAppPage/MainAppPage";
import GettingStartedPage from "@pages/GettingStartedPage/GettingStartedPage";
import ErrorRedirects from "@pages/ErrorRedirects/ErrorRedirects";

function App() {
  const { isLoading, user } = useFetchUserData();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <AppBaseLayout>
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppBaseLayout>
    );
  }

  if (user?.accountSetupRequired) {
    return (
      <AppBaseLayout>
        <Router>
          <Routes>
            <Route path="/setup-account" element={<GettingStartedPage />} />
            <Route
              path="/error/account-already-exists"
              element={<ErrorRedirects />}
            />
            <Route
              path="/*"
              element={<Navigate to="/setup-account" replace />}
            />
          </Routes>
        </Router>
      </AppBaseLayout>
    );
  }

  if (user && !user.accountSetupRequired) {
    return (
      <AppBaseLayout>
        <Router>
          <Routes>
            <Route path="*" element={<MainAppPage />} />
          </Routes>
        </Router>
      </AppBaseLayout>
    );
  }
}

function AppBaseLayout({ children }) {
  const { toasts, removeToast } = useContext(GlobalContext);

  return (
    <div className="bg-gray-975 font-normal font-sans text-base text-gray-100 leading-[1.6]">
      <ToastStackLayout toasts={toasts} removeToast={removeToast} />
      <LoadingScreen />
      <CashfreeSkelton />

      {children}
    </div>
  );
}

export default App;
