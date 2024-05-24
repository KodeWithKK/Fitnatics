import { useQuery } from "@tanstack/react-query";
import { makeGetRequest } from "@api/api";

const useFetchUserData = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await makeGetRequest(
        "http://localhost:8000/api/v1/user/get-user-data"
      );
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { isLoading, userData: data };
};

export { useFetchUserData };
