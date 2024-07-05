import { useContext, useMemo } from "react";
import { gymMotivationalQuotes } from "@data/quotes";
import { MainAppPageContext } from "@pages/MainAppPage/MainAppPage";

function useDashboardHooks() {
  const { todaysDiet } = useContext(MainAppPageContext);

  const quoteData = useMemo(
    () => gymMotivationalQuotes[getRandomInt(0, gymMotivationalQuotes.length)],
    []
  );

  const workoutChart = useMemo(() => {
    return [
      {
        day: "monday",
        dayType: "Chest & Triceps",
        timeRequired: 60,
        exercises: [
          {
            name: "Barbell Bench Press",
            sets: 4,
            reps: 8,
            repsUnit: "number",
            rest: 90,
            caloriesBurned: 180,
          },
          {
            name: "Incline Dumbbell Press",
            sets: 3,
            reps: 10,
            repsUnit: "number",
            rest: 75,
            caloriesBurned: 150,
          },
          {
            name: "Cable Flyes",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 120,
          },
          {
            name: "Tricep Pushdowns",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 100,
          },
          {
            name: "Overhead Tricep Extension",
            sets: 3,
            reps: 10,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 90,
          },
        ],
      },
      {
        day: "tuesday",
        dayType: "Back & Biceps",
        timeRequired: 65,
        exercises: [
          {
            name: "Lat Pulldowns",
            sets: 4,
            reps: 10,
            repsUnit: "number",
            rest: 90,
            caloriesBurned: 160,
          },
          {
            name: "Seated Cable Rows",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 75,
            caloriesBurned: 140,
          },
          {
            name: "Dumbbell Rows",
            sets: 3,
            reps: 10,
            repsUnit: "number",
            rest: 75,
            caloriesBurned: 130,
          },
          {
            name: "Barbell Bicep Curls",
            sets: 3,
            reps: 10,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 100,
          },
          {
            name: "Hammer Curls",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 90,
          },
        ],
      },
      {
        day: "wednesday",
        dayType: "Legs & Core",
        timeRequired: 70,
        exercises: [
          {
            name: "Squats",
            sets: 4,
            reps: 8,
            repsUnit: "number",
            rest: 120,
            caloriesBurned: 200,
          },
          {
            name: "Leg Press",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 90,
            caloriesBurned: 180,
          },
          {
            name: "Romanian Deadlifts",
            sets: 3,
            reps: 10,
            repsUnit: "number",
            rest: 90,
            caloriesBurned: 160,
          },
          {
            name: "Leg Extensions",
            sets: 3,
            reps: 15,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 120,
          },
          {
            name: "Plank",
            sets: 3,
            reps: 45,
            repsUnit: "secs",
            rest: 45,
            caloriesBurned: 60,
          },
          {
            name: "Russian Twists",
            sets: 3,
            reps: 20,
            repsUnit: "number",
            rest: 45,
            caloriesBurned: 50,
          },
        ],
      },
      {
        day: "thursday",
        dayType: "Shoulders & Arms",
        timeRequired: 60,
        exercises: [
          {
            name: "Overhead Press",
            sets: 4,
            reps: 8,
            repsUnit: "number",
            rest: 90,
            caloriesBurned: 160,
          },
          {
            name: "Lateral Raises",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 100,
          },
          {
            name: "Front Raises",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 100,
          },
          {
            name: "EZ Bar Curls",
            sets: 3,
            reps: 10,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 110,
          },
          {
            name: "Tricep Rope Pushdowns",
            sets: 3,
            reps: 12,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 100,
          },
        ],
      },
      {
        day: "friday",
        dayType: "Full Body & HIIT",
        timeRequired: 75,
        exercises: [
          {
            name: "Deadlifts",
            sets: 4,
            reps: 6,
            repsUnit: "number",
            rest: 120,
            caloriesBurned: 220,
          },
          {
            name: "Pull-ups (assisted if needed)",
            sets: 3,
            reps: 8,
            repsUnit: "number",
            rest: 90,
            caloriesBurned: 150,
          },
          {
            name: "Dips",
            sets: 3,
            reps: 10,
            repsUnit: "number",
            rest: 75,
            caloriesBurned: 130,
          },
          {
            name: "Burpees",
            sets: 3,
            reps: 15,
            repsUnit: "number",
            rest: 60,
            caloriesBurned: 180,
          },
          {
            name: "Mountain Climbers",
            sets: 3,
            reps: 30,
            repsUnit: "secs",
            rest: 45,
            caloriesBurned: 100,
          },
          {
            name: "Jump Rope",
            sets: 3,
            reps: 2,
            repsUnit: "mins",
            rest: 60,
            caloriesBurned: 200,
          },
        ],
      },
      {
        day: "saturday",
        dayType: "Active Recovery",
        timeRequired: 45,
        exercises: [
          {
            name: "Brisk Walking",
            sets: 1,
            reps: 30,
            repsUnit: "mins",
            rest: 0,
            caloriesBurned: 250,
          },
          {
            name: "Light Yoga",
            sets: 1,
            reps: 15,
            repsUnit: "mins",
            rest: 0,
            caloriesBurned: 80,
          },
        ],
      },
      {
        day: "sunday",
        dayType: "Rest",
        timeRequired: 0,
        exercises: [],
      },
    ];
  }, []);

  const todaysNutritionGoal = useMemo(() => {
    const goal = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    };

    for (const key in todaysDiet) {
      if (key === "_id") continue;
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
