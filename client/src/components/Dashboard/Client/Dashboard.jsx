import NutritionCard from "./NutritionCard";
import DietTable from "./DietTable";
import MonthlyProgress from "./MonthlyProgress";
import WorkoutChart from "./WorkoutChart";
import { useDashboardHooks } from "./Dashboard.hooks";

const Dashboard = () => {
  const { quoteData, workoutChart, todaysDiet, todaysNutritionGoal } =
    useDashboardHooks();

  return (
    <>
      {/* COLOUMN 1 */}
      <div className="px-8 pt-8 w-[768px] overflow-y-auto">
        {/* NUTRITION GOAL */}
        <h3 className="mb-3 font-bold">Nutrition Goal</h3>
        <div className="inline-flex gap-2">
          <NutritionCard
            type="calories"
            goal={todaysNutritionGoal.calories}
            goalAchived="78"
          />
          <NutritionCard
            type="protein"
            goal={todaysNutritionGoal.protein}
            goalAchived="62"
          />
          <NutritionCard
            type="carb"
            goal={todaysNutritionGoal.carbs}
            goalAchived="88"
          />
          <NutritionCard
            type="fat"
            goal={todaysNutritionGoal.fat}
            goalAchived="68"
          />
        </div>

        {/* Today's Nutrition */}
        <h3 className="mt-6 mb-3 font-bold">Today&apos;s Diet</h3>
        <DietTable todaysDiet={todaysDiet} />

        {/* My Exercise */}
        <h3 className="mt-6 mb-3 font-bold">Workout Chart</h3>
        <WorkoutChart workoutChart={workoutChart} />
      </div>

      {/* COLOUMN 2 */}
      <div className="flex-1 border-gray-900 border-l-[1px]">
        <MonthlyProgress />

        <div className="bg-gray-900/[.8] mx-6 mt-8 px-8 py-4 rounded-md h-[256px] text-center">
          <h3 className="font-bold">Todays&apos; Quote</h3>
          <div className="flex flex-col justify-center -mt-3 h-full">
            <h2 className="text-pretty text-xl">{quoteData.quote}</h2>
            <p className="mt-4 text-gray-400">- {quoteData.author}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
