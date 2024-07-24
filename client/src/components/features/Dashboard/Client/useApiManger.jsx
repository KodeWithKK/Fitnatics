import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function useApiManager() {
  const queryClient = useQueryClient();

  const fetchedUser = useMemo(
    () => queryClient.getQueryData(["user"]),
    [queryClient],
  );

  const todaysDiet = useMemo(() => {
    return fetchedUser.memberDetails.fitness.dietChart.chart[
      weekdays[dayjs().day()]
    ];
  }, [fetchedUser.memberDetails.fitness.dietChart.chart]);

  const workoutChart = useMemo(() => {
    return fetchedUser.memberDetails.fitness.workoutChart.chart;
  }, [fetchedUser.memberDetails.fitness.workoutChart.chart]);

  return { todaysDiet, workoutChart };
}

export default useApiManager;
