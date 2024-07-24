import { useContext, useState } from "react";
import OnboardingForm from "@layouts/OnboardingPageLayout/OnboardingForm";
import PriceCard from "./PriceCard";
import { LeftMoveIcon } from "./Icons";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";

const totalDisplayedCards = 2;
const cardWidth = 306;

const PricingForm = ({ stepDescription }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { membershipPlans } = useContext(OnboardingContext);

  return (
    <OnboardingForm
      stepDescription={stepDescription}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <OnboardingForm.Headline
        className={"mx-auto mb-4 mt-6"}
        style={{ width: "calc(306px * 2 + 20px)" }}
      />

      <div className="grid h-full place-items-center">
        <div className="inline-flex items-center justify-center gap-5">
          <button
            type="button"
            className={`${
              activeIndex <= 0 && "invisible"
            } grid h-[53px] w-[53px] place-items-center rounded-full hover:border hover:border-gray-800 hover:bg-gray-800/[.7]`}
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
            } grid h-[53px] w-[53px] place-items-center rounded-full hover:border hover:border-gray-800 hover:bg-gray-800/[.7]`}
            onClick={() => setActiveIndex(activeIndex + 1)}
            disabled={activeIndex >= 5 - totalDisplayedCards}
          >
            <LeftMoveIcon className="-mr-1 h-6 rotate-180 text-gray-500/[.8]" />
          </button>
        </div>
      </div>
    </OnboardingForm>
  );
};

export default PricingForm;
