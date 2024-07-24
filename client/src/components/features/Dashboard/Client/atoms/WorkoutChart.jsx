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
              className="flex w-full items-center justify-between rounded-md bg-gray-900/[.8] p-4"
              onClick={() => {
                setIsTriggered((prevState) => {
                  const nextState = [...prevState];
                  nextState[idx] = !nextState[idx];
                  return nextState;
                });
              }}
            >
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-500">
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
              <Accordion.Content className="rounded-md border-[2px] border-gray-900">
                {exercises.map((exercise, i) => (
                  <div
                    key={`item-${idx}-content-${i}`}
                    className="mx-4 flex items-center justify-between border-b border-gray-900 py-2 last:border-0"
                  >
                    <div>
                      <div className="border-gray-700">{exercise.name}</div>
                      <div className="text-sm text-gray-500">{`${
                        exercise.sets
                      } x ${exercise.reps} ${
                        exercise.repsUnit === "number"
                          ? capitalizeFirst("reps")
                          : capitalizeFirst(exercise.repsUnit)
                      } • ${exercise.rest}s Rest`}</div>
                    </div>
                    <Checkbox.Root className="h-6 w-6 rounded-md border-2 border-gray-700">
                      <Checkbox.Indicator className="text-gray-400">
                        <CheckIcon className="h-full w-full p-[3px]" />
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
