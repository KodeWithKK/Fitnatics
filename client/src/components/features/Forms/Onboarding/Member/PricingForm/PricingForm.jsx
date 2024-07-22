import { useContext, useState } from "react";
import SteperLayout from "@layouts/SteperFormLayout/SteperLayout";
import PriceCard from "./PriceCard";
import { LeftMoveIcon } from "./Icons";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";

const totalDisplayedCards = 2;
const cardWidth = 306;

const PricingForm = ({ stepDescription }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { membershipPlans } = useContext(OnboardingContext);

  return (
    <SteperLayout.Form
      stepDescription={stepDescription}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid h-full place-items-center">
        <div className="inline-flex items-center justify-center gap-5">
          <button
            type="button"
            className={`${
              activeIndex <= 0 && "invisible"
            } place-items-center hover:border-gray-800 grid hover:bg-gray-800/[.7] hover:border rounded-full w-[53px] h-[53px]`}
            onClick={() => setActiveIndex(activeIndex - 1)}
            disabled={activeIndex <= 0}
          >
            <LeftMoveIcon className="-ml-1 h-6 text-gray-500/[.8]" />
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
              {membershipPlans.map((plan) => (
                <PriceCard
                  key={plan._id}
                  productId={plan._id}
                  type={plan.type}
                  duration={plan.duration}
                  orginalPrice={plan.orgPrice}
                  dicountedPrice={plan.currPrice}
                  features={plan.features}
                />
              ))}
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
            <LeftMoveIcon className="-mr-1 h-6 text-gray-500/[.8] rotate-180" />
          </button>
        </div>
      </div>
    </SteperLayout.Form>
  );
};

export default PricingForm;
