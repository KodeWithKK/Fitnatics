import { useQuery, useQueries } from "@tanstack/react-query";
import apiClient from "@api/apiClient";
import dayjs from "dayjs";
import { range } from "@utils/range";

function useApiManager() {


  // const { isLoading: isTodaysDietLoading, data: todaysDietEntry } = useQuery({
  //   queryKey: ["todays-diet"],
  //   queryFn: async () => {
  //     const res = await apiClient.get(
  //       import.meta.env.VITE_BACKEND_API_BASE + "/user/get-todays-diet-entry",
  //       {
  //         dateString: dayjs().format("YYYY-MM-DD"),
  //       }
  //     );
  //     return res;
  //   },
  //   retry: 1,
  //   retryDelay: 0,
  // });
  // const data = useQueries({
  //   queries: range(7).map((day) => ({
  //     queryKey: ["weekly-exercise", day],
  //     queryFn: async () => {
  //       const res = await apiClient.get(
  //         import.meta.env.VITE_BACKEND_API_BASE + "/user/get-todays-diet-entry",
  //         {
  //           dateString: dayjs().day(day).format("YYYY-MM-DD"),
  //         }
  //       );
  //       return res;
  //     },
  //   })),
  // });
  // return { isLoading: isTodaysDietLoading, todaysDietEntry };


}

export default useApiManager;
