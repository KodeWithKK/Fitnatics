import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { GlobalContext } from "@context/GlobalContextProvider";
import apiClient from "@api/apiClient";

const useFetchUserData = () => {
  const { addRefetchFn } = useContext(GlobalContext);

  const {
    isLoading,
    data: userData,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiClient.get(
        import.meta.env.VITE_BACKEND_API_BASE + "/user/get-user-data"
      );
      return res;
    },
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    addRefetchFn({ name: "user", fn: refetchUser });
  }, [addRefetchFn, refetchUser]);
  return { isLoading, userData, refetchUser };
};

export { useFetchUserData };
