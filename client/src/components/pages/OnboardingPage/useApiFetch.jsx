import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiClient from "@api/apiClient";

const useApiFetch = () => {
  const { isLoading, data: membershipPlans } = useQuery({
    queryKey: ["membershipPlans"],
    queryFn: async () => {
      return await apiClient.get(
        import.meta.env.VITE_BACKEND_API_BASE + "/get-data/membership-plans",
      );
    },
    retry: 2,
    retryDelay: 0,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { isLoading, membershipPlans: membershipPlans?.data };
};

export default useApiFetch;
