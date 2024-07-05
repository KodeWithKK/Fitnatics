import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import dayjs from "dayjs";

function useApiManager() {
  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  const { isLoading, data: todaysDiet } = useQuery({
    queryKey: ["todays-diet"],
    queryFn: async () => {
      const res = await apiClient.get(
        import.meta.env.VITE_BACKEND_API_BASE + "/user/get-todays-diet-entry",
        {
          dateString: dayjs().format("YYYY-MM-DD"),
        }
      );
      return res;
    },
    retry: 1,
    retryDelay: 0,
  });

  return { user, isLoading, todaysDiet };
}

export default useApiManager;
