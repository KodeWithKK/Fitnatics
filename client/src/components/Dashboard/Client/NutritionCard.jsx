import { CaloriesIcon, ProteinIcon, CarbsIcon, FatIcon } from "../../../Icons";

const NutritionCard = ({ type, goal, goalAchived }) => {
  const Icon = data[type].Icon;

  const progressBarStyle = {
    width: `${goalAchived}%`,
  };

  return (
    <div className="w-[168px] bg-gray-900/[.8] rounded-md px-4 py-5">
      <div className="flex justify-between">
        <div className="rounded-full w-[64px] p-[15px] bg-gray-800/[.6]">
          <Icon />
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-sm">{goal}</h3>
          <p className="text-xs text-gray-400">{data[type].unit}</p>
        </div>
      </div>
      <h3 className="font-semibold mt-2.5 mb-6">{data[type].text}</h3>
      <div className="h-2 w-full bg-gray-800 rounded">
        <div
          className={`h-2 bg-gray-700 rounded relative`}
          style={progressBarStyle}
        >
          <span className="absolute right-0 bottom-2.5 font-semibold text-xs text-gray-500">
            {goalAchived}%
          </span>
        </div>
      </div>
    </div>
  );
};

const data = {
  calories: {
    text: "Calories",
    Icon: CaloriesIcon,
    unit: "KCal",
  },
  protein: {
    text: "Protein",
    Icon: ProteinIcon,
    unit: "gram",
  },
  carb: {
    text: "Carb",
    Icon: CarbsIcon,
    unit: "gram",
  },
  fat: {
    text: "Fat",
    Icon: FatIcon,
    unit: "gram",
  },
};

export default NutritionCard;
