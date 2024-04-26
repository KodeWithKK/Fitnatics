import React from "react";
import NutritionCard from "./NutritionCard";
import DietTable from "./DietTable";
import MonthlyProgress from "./MonthlyProgress";
import MyExercises from "./MyExercises";
import { gymMotivationalQuotes } from "../../../data/quotes";

const Dashboard = () => {
  const quoteData = React.useMemo(
    () => gymMotivationalQuotes[getRandomInt(0, gymMotivationalQuotes.length)],
    []
  );

  return (
    <>
      {/* COLOUMN 1 */}
      <div className="overflow-y-auto w-[768px] pt-8 px-8">
        {/* NUTRITION GOAL */}
        <h3 className="font-bold mb-3">Nutrition Goal</h3>
        <div className="inline-flex gap-2">
          <NutritionCard type="calories" goal="2200" goalAchived="78" />
          <NutritionCard type="protein" goal="90" goalAchived="62" />
          <NutritionCard type="carb" goal="320" goalAchived="88" />
          <NutritionCard type="fat" goal="80" goalAchived="68" />
        </div>

        {/* Today's Nutrition */}
        <h3 className="font-bold mt-6 mb-3">Today&apos;s Diet</h3>
        <DietTable />

        {/* My Exercise */}
        <h3 className="font-bold mt-6 mb-3">My Exercises</h3>
        <MyExercises />
      </div>

      {/* COLOUMN 2 */}
      <div className="flex-1 border-l-[1px] border-gray-900">
        <MonthlyProgress />

        <div className="h-[256px] mt-8 mx-6 py-4 px-8 bg-gray-900/[.8] text-center rounded-md">
          <h3 className="font-bold">Todays&apos; Quote</h3>
          <div className="flex flex-col h-full justify-center -mt-3">
            <h2 className="text-xl text-pretty">{quoteData.quote}</h2>
            <p className="mt-4 text-gray-400">- {quoteData.author}</p>
          </div>
        </div>
      </div>
    </>
  );
};

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export default Dashboard;
