import NutritionCard from "./atoms/NutritionCard";
import DietTable from "./atoms/DietTable";
import MonthlyProgress from "./atoms/MonthlyProgress";
import WorkoutChart from "./atoms/WorkoutChart";
import { useDashboardHooks } from "./Dashboard.hooks";

const Dashboard = () => {
  const { quoteData, workoutChart, todaysDiet, todaysNutritionGoal } =
    useDashboardHooks();

  return (
    <>
      {/* COLOUMN 1 */}
      <div className="w-[768px] overflow-y-auto px-8 pt-8">
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
        <h3 className="mb-3 mt-6 font-bold">Today&apos;s Diet</h3>
        <DietTable todaysDiet={todaysDiet} />

        {/* My Exercise */}
        <h3 className="mb-3 mt-6 font-bold">Workout Chart</h3>
        <WorkoutChart workoutChart={workoutChart} />
      </div>

      {/* COLOUMN 2 */}
      <div className="flex-1 border-l-[1px] border-gray-900">
        <MonthlyProgress />

        <div className="mx-6 mt-8 h-[256px] rounded-md bg-gray-900/[.8] px-8 py-4 text-center">
          <h3 className="font-bold">Todays&apos; Quote</h3>
          <div className="-mt-3 flex h-full flex-col justify-center">
            <h2 className="text-pretty text-xl">{quoteData.quote}</h2>
            <p className="mt-4 text-gray-400">- {quoteData.author}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
