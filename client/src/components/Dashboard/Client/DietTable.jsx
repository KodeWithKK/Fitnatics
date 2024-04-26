import React from "react";
import { CaloriesIcon, ProteinIcon, CarbsIcon, FatIcon } from "../../../Icons";
import { beginnerDietData } from "../../../data/diet";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const DietTable = () => {
  const data = beginnerDietData[4];

  return (
    <div className="w-[696px] space-y-2">
      <DietTableItem type="Breakfast" data={data.breakfast} />
      <DietTableItem type="Lunch" data={data.lunch} />
      <DietTableItem type="Pre-Workout" data={data.pre_workout} />
      <DietTableItem type="Post-Workout" data={data.post_workout} />
      <DietTableItem type="Dinner" data={data.dinner} />
    </div>
  );
};

function DietTableItem({ type, data }) {
  return (
    <div className="flex items-center bg-gray-900/[.8] rounded-md px-4 py-3">
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

      <Checkbox.Root className="w-6 h-6 bg-gray-950 rounded-md">
        <Checkbox.Indicator className="text-gray-400">
          <CheckIcon className="w-full h-full p-[3px]" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  );
}

function DietTableItemIcon({ Icon, title, data }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800/[.6] mb-1 p-2 rounded-full" title={title}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs text-gray-500">{data}</span>
    </div>
  );
}

export default DietTable;
