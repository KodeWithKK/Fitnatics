import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@api/apiClient";

const useFetchUserData = () => {
  const {
    isLoading,
    data: userData,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiClient.get(
        "http://localhost:8000/api/v1/user/get-user-data"
      );
      return res;
    },
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { isLoading, userData, refetchUser };
};

export { useFetchUserData };
