import {
  CaloriesIcon,
  ProteinIcon,
  CarbsIcon,
  FatIcon,
} from "@shared/Icons/Icons";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const DietTable = ({ todaysDiet }) => {
  return (
    <div className="space-y-2 w-[696px]">
      <DietTableItem type="Breakfast" data={todaysDiet.breakfast} />
      <DietTableItem type="Lunch" data={todaysDiet.lunch} />
      <DietTableItem type="Pre-Workout" data={todaysDiet.pre_workout} />
      <DietTableItem type="Post-Workout" data={todaysDiet.post_workout} />
      <DietTableItem type="Dinner" data={todaysDiet.dinner} />
    </div>
  );
};

function DietTableItem({ type, data }) {
  return (
    <div className="flex items-center bg-gray-900/[.8] px-4 py-3 rounded-md">
      <div>
        <h4 className="text-xs text-gray-500">{type.toUpperCase()}</h4>
        <p>{data.name}</p>
      </div>

      <div className="flex gap-2 ml-auto mr-4">
        <DietTableItemIcon
          Icon={CaloriesIcon}
          data={data.calories}
          title="Calories"
        />
        <DietTableItemIcon
          Icon={ProteinIcon}
          data={data.protein}
          title="Protein"
        />
        <DietTableItemIcon
          Icon={CarbsIcon}
          data={data.carbs}
          title="Carbohydrates"
        />
        <DietTableItemIcon Icon={FatIcon} data={data.fat} title="Fats" />
      </div>

      <Checkbox.Root className="w-6 h-6 rounded-md bg-gray-950">
        <Checkbox.Indicator className="text-gray-400">
          <CheckIcon className="p-[3px] w-full h-full" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
}

function DietTableItemIcon({ Icon, title, data }) {
  return (
    <div className="flex flex-col items-center cursor-default" title={title}>
      <div className="bg-gray-800/[.6] mb-1 p-2 rounded-full">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs text-gray-500">{data}</span>
    </div>
  );
}

export default DietTable;
