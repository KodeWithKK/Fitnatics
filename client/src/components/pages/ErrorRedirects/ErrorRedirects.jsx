import { useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import { Navigate } from "react-router-dom";

let toastAdded = false;

function ErrorRedirects() {
  const { addToast } = useContext(GlobalContext);

  if (!toastAdded) {
    toastAdded = true;
    addToast(
      "error",
      "User already exists!",
      "An account with this email already exists"
    );
  }

  return <Navigate to="/" replace />;
}

export default ErrorRedirects;
