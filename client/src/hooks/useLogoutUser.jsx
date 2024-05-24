import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { makePostRequest } from "@api/api";
import { GlobalContext } from "@context/GlobalContextProvider";

const useLogoutUser = () => {
  const { addToast } = useContext(GlobalContext);

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: async () => {
      return await makePostRequest("http://localhost:8000/api/v1/auth/logout");
    },
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      addToast("error", error?.title, error?.message);
    },
  });

  return { logoutUser, isPending };
};

export { useLogoutUser };
