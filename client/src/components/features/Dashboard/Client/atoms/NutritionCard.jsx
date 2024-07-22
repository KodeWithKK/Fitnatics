import {
  CaloriesIcon,
  ProteinIcon,
  CarbsIcon,
  FatIcon,
} from "@shared/icons/Icons";

const NutritionCard = ({ type, goal, goalAchived }) => {
  const Icon = macro[type].Icon;

  const progressBarStyle = {
    width: `${goalAchived}%`,
  };

  return (
    <div className="bg-gray-900/[.8] px-4 py-5 rounded-md w-[168px]">
      <div className="flex justify-between">
        <div className="bg-gray-800/[.6] p-[15px] rounded-full w-[64px] h-[64px]">
          <Icon className="w-full h-full" />
        </div>
        <div className="text-right">
          <h3 className="text-sm font-semibold">{goal}</h3>
          <p className="text-xs text-gray-400">{macro[type].unit}</p>
        </div>
      </div>
      <h3 className="mt-2.5 mb-6 font-semibold">{macro[type].text}</h3>
      <div className="w-full h-2 bg-gray-800 rounded">
        <div
          className={`h-2 bg-gray-700 rounded relative`}
          style={progressBarStyle}
        >
          <span className="right-0 bottom-2.5 absolute font-semibold text-gray-500 text-xs">
            {goalAchived}%
          </span>
        </div>
      </div>
    </div>
  );
};

const macro = {
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
