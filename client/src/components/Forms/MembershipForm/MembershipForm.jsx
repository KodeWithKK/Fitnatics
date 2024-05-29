import React from "react";
import PriceCard from "./PriceCard";
import { LeftArrowIcon } from "../atoms/Icons";

const totalDisplayedCards = 2;
const cardWidth = 306;

const MembershipForm = ({ setStep }) => {
  const [activeIndex, setActiveIndex] = React.useState(1);

  return (
    <form className="place-items-center grid h-full">
      <div className="inline-flex flex-col items-end">
        <div className="inline-flex justify-center items-center gap-5">
          <button
            type="button"
            className={`${
              activeIndex <= 0 && "invisible"
            } place-items-center hover:border-gray-800 grid hover:bg-gray-800/[.7] hover:border rounded-full w-[53px] h-[53px]`}
            onClick={() => setActiveIndex(activeIndex - 1)}
            disabled={activeIndex <= 0}
          >
            <LeftArrowIcon className="-ml-1 h-6 text-gray-500/[.8]" />
          </button>
          <div
            className={`overflow-hidden`}
            style={{
              width: `${
                cardWidth * totalDisplayedCards + 12 * (totalDisplayedCards - 1)
              }px`,
            }}
          >
            <div
              className="flex gap-3 transition-all"
              style={{
                transform: `translateX(-${(cardWidth + 12) * activeIndex}px)`,
              }}
            >
              <PriceCard
                duration={1}
                orginalPrice={1599}
                dicountedPrice={1199}
              />
              <PriceCard
                duration={3}
                orginalPrice={3499}
                dicountedPrice={3199}
              />
              <PriceCard
                duration={6}
                orginalPrice={4499}
                dicountedPrice={4299}
              />
              <PriceCard
                duration={12}
                orginalPrice={5999}
                dicountedPrice={5699}
              />
              <PriceCard
                duration={24}
                orginalPrice={9999}
                dicountedPrice={9499}
              />
            </div>
          </div>
          <button
            type="button"
            className={`${
              activeIndex >= 5 - totalDisplayedCards && "invisible"
            } place-items-center hover:border-gray-800 grid hover:bg-gray-800/[.7] hover:border rounded-full w-[53px] h-[53px]`}
            onClick={() => setActiveIndex(activeIndex + 1)}
            disabled={activeIndex >= 5 - totalDisplayedCards}
          >
            <LeftArrowIcon className="-mr-1 h-6 text-gray-500/[.8] rotate-180" />
          </button>
        </div>

        <button
          type="button"
          className="bg-gray-800 mt-4 mr-[73px] px-4 rounded-md h-[36px] select-none"
          onClick={() => setStep(3)}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default MembershipForm;
