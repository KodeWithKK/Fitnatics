import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Accordion from "@radix-ui/react-accordion";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { capitalizeFirst } from "@utils/transformer";

const MyExercises = ({ workoutChart }) => {
  const [isTriggered, setIsTriggered] = useState([...Array(7)].fill(false));

  return (
    <div className="mb-4 w-[696px]">
      <Accordion.Root type="single" collapsible={true}>
        {workoutChart.map(({ day, dayType, exercises }, idx) => (
          <Accordion.Item key={idx} className="mb-2" value={`item-${idx}`}>
            <Accordion.Trigger
              className="flex justify-between items-center bg-gray-900/[.8] p-4 rounded-md w-full"
              onClick={() => {
                setIsTriggered((prevState) => {
                  const nextState = [...prevState];
                  nextState[idx] = !nextState[idx];
                  return nextState;
                });
              }}
            >
              <div className="text-left">
                <p className="font-semibold text-gray-500 text-xs">
                  {day.toUpperCase()}
                </p>
                <p>{dayType}</p>
              </div>
              <div className="flex gap-2">
                {exercises.length > 0 && (
                  <ChevronDownIcon
                    className={`${
                      isTriggered[idx] == true ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
            </Accordion.Trigger>
            {exercises.length > 0 && (
              <Accordion.Content className="border-[2px] border-gray-900 rounded-md">
                {exercises.map((exercise, i) => (
                  <div
                    key={`item-${idx}-content-${i}`}
                    className="flex justify-between items-center border-gray-900 last:border-0 mx-4 py-2 border-b"
                  >
                    <div>
                      <div className="border-gray-700">{exercise.name}</div>
                      <div className="text-gray-500 text-sm">{`${
                        exercise.sets
                      } x ${exercise.reps} ${
                        exercise.repsUnit === "number"
                          ? capitalizeFirst("reps")
                          : capitalizeFirst(exercise.repsUnit)
                      } • ${exercise.rest}s Rest`}</div>
                    </div>
                    <Checkbox.Root className="border-2 border-gray-700 rounded-md w-6 h-6">
                      <Checkbox.Indicator className="text-gray-400">
                        <CheckIcon className="p-[3px] w-full h-full" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </div>
                ))}
              </Accordion.Content>
            )}
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default MyExercises;
