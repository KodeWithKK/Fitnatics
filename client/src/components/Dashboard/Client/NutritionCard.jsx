import {
  CaloriesIcon,
  ProteinIcon,
  CarbsIcon,
  FatIcon,
} from "../../../icons/Icons";

const NutritionCard = ({ type, goal, goalAchived }) => {
  const Icon = data[type].Icon;

  const progressBarStyle = {
    width: `${goalAchived}%`,
  };

  return (
    <div className="bg-gray-900/[.8] px-4 py-5 rounded-md w-[168px]">
      <div className="flex justify-between">
        <div className="bg-gray-800/[.6] p-[15px] rounded-full w-[64px]">
          <Icon />
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-sm">{goal}</h3>
          <p className="text-gray-400 text-xs">{data[type].unit}</p>
        </div>
      </div>
      <h3 className="mt-2.5 mb-6 font-semibold">{data[type].text}</h3>
      <div className="bg-gray-800 rounded w-full h-2">
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
