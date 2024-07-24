import {
  CaloriesIcon,
  ProteinIcon,
  CarbsIcon,
  FatIcon,
} from "@shared/icons/Icons";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const DietTable = ({ todaysDiet }) => {
  return (
    <div className="w-[696px] space-y-2">
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
    <div className="flex items-center rounded-md bg-gray-900/[.8] px-4 py-3">
      <div>
        <h4 className="text-xs text-gray-500">{type.toUpperCase()}</h4>
        <p>{data.name}</p>
      </div>

      <div className="ml-auto mr-4 flex gap-2">
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

      <Checkbox.Root className="h-6 w-6 rounded-md bg-gray-950">
        <Checkbox.Indicator className="text-gray-400">
          <CheckIcon className="h-full w-full p-[3px]" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
}

function DietTableItemIcon({ Icon, title, data }) {
  return (
    <div className="flex cursor-default flex-col items-center" title={title}>
      <div className="mb-1 rounded-full bg-gray-800/[.6] p-2">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs text-gray-500">{data}</span>
    </div>
  );
}

export default DietTable;
