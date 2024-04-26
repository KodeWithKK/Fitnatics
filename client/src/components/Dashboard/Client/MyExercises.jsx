import React from "react";
import { beginnerExercises } from "../../../data/exercise";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const MyExercises = () => {
  return (
    <div className="mb-4 w-[696px]">
      <Accordion.Root type="single" collapsible={true}>
        {beginnerExercises.map(({ dayType, exercises }, idx) => (
          <Accordion.Item key={idx} className="mb-2" value={`item-${idx}`}>
            <Accordion.Trigger className="flex justify-between bg-gray-900/[.8] w-full p-4 rounded-md">
              <div>
                {/* <span className="mr-2 py-2 px-4 bg-gray-800/[.6] w-6 rounded-full">
                  {idx + 1}
                </span> */}
                Day {idx + 1}: {dayType}
              </div>
              {exercises.length > 0 && <ChevronDownIcon />}
            </Accordion.Trigger>
            {exercises.length > 0 && (
              <Accordion.Content className="border-[2px] border-gray-900 rounded-md">
                {exercises.map((exercise, i) => (
                  <div key={`item-${idx}-content-${i}`} className="px-4 py-2">
                    <div>{exercise.name}</div>
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
