import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@api/apiClient";

const useFetchUserData = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiClient.get(
        import.meta.env.VITE_BACKEND_API_BASE + "/user/get-user-data",
      );
      return res;
    },
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { isLoading, user };
};

export { useFetchUserData };
