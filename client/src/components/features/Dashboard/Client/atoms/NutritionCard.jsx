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
    <div className="w-[168px] rounded-md bg-gray-900/[.8] px-4 py-5">
      <div className="flex justify-between">
        <div className="h-[64px] w-[64px] rounded-full bg-gray-800/[.6] p-[15px]">
          <Icon className="h-full w-full" />
        </div>
        <div className="text-right">
          <h3 className="text-sm font-semibold">{goal}</h3>
          <p className="text-xs text-gray-400">{macro[type].unit}</p>
        </div>
      </div>
      <h3 className="mb-6 mt-2.5 font-semibold">{macro[type].text}</h3>
      <div className="h-2 w-full rounded bg-gray-800">
        <div
          className={`relative h-2 rounded bg-gray-700`}
          style={progressBarStyle}
        >
          <span className="absolute bottom-2.5 right-0 text-xs font-semibold text-gray-500">
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
