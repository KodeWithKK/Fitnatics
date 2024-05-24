import React from "react";
import {
  CaloriesIcon,
  ProteinIcon,
  CarbsIcon,
  FatIcon,
} from "../../../icons/Icons";
import { beginnerDietData } from "../../../data/diet";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const DietTable = () => {
  const data = beginnerDietData[4];

  return (
    <div className="space-y-2 w-[696px]">
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
    <div className="flex items-center bg-gray-900/[.8] px-4 py-3 rounded-md">
      <div>
        <h4 className="text-gray-500 text-xs">{type.toUpperCase()}</h4>
        <p>{data.name}</p>
      </div>

      <div className="flex gap-2 mr-4 ml-auto">
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

      <Checkbox.Root className="bg-gray-950 rounded-md w-6 h-6">
        <Checkbox.Indicator className="text-gray-400">
          <CheckIcon className="p-[3px] w-full h-full" />
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
      <span className="text-gray-500 text-xs">{data}</span>
    </div>
  );
}

export default DietTable;
