import { useQuery } from "@tanstack/react-query";
import { makeGetRequest } from "@api/api";

const useFetchUserData = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await makeGetRequest(
        "http://localhost:8000/api/v1/user/get-user-data"
      );
      return res;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { isLoading, userData: data };
};

export { useFetchUserData };
