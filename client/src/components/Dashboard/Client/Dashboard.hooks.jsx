import { useMemo } from "react";
import { gymMotivationalQuotes } from "@data/quotes";
import { useQueryClient } from "@tanstack/react-query";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function useDashboardHooks() {
  const queryClient = useQueryClient();
  const user = useMemo(() => queryClient.getQueryData(["user"]), [queryClient]);

  const quoteData = useMemo(
    () => gymMotivationalQuotes[getRandomInt(0, gymMotivationalQuotes.length)],
    []
  );

  const workoutChart = useMemo(
    () => user.fitnessRecords.workoutChartData.workoutChart,
    [user]
  );

  const weekday = useMemo(() => {
    const d = new Date();
    return days[d.getDay()];
  }, []);

  const todaysDiet = useMemo(() => {
    const dietChart = user.fitnessRecords.dietChartData.dietChart;
    return dietChart[weekday];
  }, [user, weekday]);

  const todaysNutritionGoal = useMemo(() => {
    const goal = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    for (const key in todaysDiet) {
      goal.calories += todaysDiet[key].calories;
      goal.protein += todaysDiet[key].protein;
      goal.carbs += todaysDiet[key].carbs;
      goal.fat += todaysDiet[key].fat;
    }

    return goal;
  }, [todaysDiet]);

  return {
    quoteData,
    workoutChart,
    todaysDiet,
    todaysNutritionGoal,
  };
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  // The maximum is exclusive and the minimum is inclusive
}

export { useDashboardHooks };
