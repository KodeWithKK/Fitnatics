import React from "react";
import { CheckIcon, LeftArrowIcon } from "./atoms/Icons";

const totalDisplayedCards = 3;

const PricingForm = ({ formData }) => {
  const [activeIndex, setActiveIndex] = React.useState(1);

  return (
    <div className="bg-gray-950 px-[6%] py-8 h-screen overflow-y-auto">
      {/* CARDS CONTAINER */}
      <div className="flex justify-center items-center gap-5 pt-4">
        <button
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
              306 * totalDisplayedCards + 12 * (totalDisplayedCards - 1)
            }px`,
          }}
        >
          <div
            className="flex gap-3 transition-all"
            style={{
              transform: `translateX(-${318 * activeIndex}px)`,
            }}
          >
            <PriceCard duration={1} orginalPrice={1599} dicountedPrice={1199} />
            <PriceCard duration={3} orginalPrice={3499} dicountedPrice={3199} />
            <PriceCard duration={6} orginalPrice={4499} dicountedPrice={4299} />
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
          className={`${
            activeIndex >= 5 - totalDisplayedCards && "invisible"
          } place-items-center hover:border-gray-800 grid hover:bg-gray-800/[.7] hover:border rounded-full w-[53px] h-[53px]`}
          onClick={() => setActiveIndex(activeIndex + 1)}
          disabled={activeIndex >= 5 - totalDisplayedCards}
        >
          <LeftArrowIcon className="-mr-1 h-6 text-gray-500/[.8] rotate-180" />
        </button>
      </div>
    </div>
  );
};

function PriceCard({ duration, orginalPrice, dicountedPrice }) {
  return (
    <div className="border-[3px] border-gray-600/[.8] p-4 rounded-md w-[306px] select-none shrink-0">
      {/* HEADER */}
      <div className="flex justify-between">
        <div className="text-center">
          <h1 className="font-semibold text-5xl">{duration}</h1>
          <h3 className="font-medium text-lg uppercase">
            {duration == 1 ? "Month" : "Months"}
          </h3>
        </div>
        <div className="text-right font-medium">
          <h3 className="text-gray-400 text-sm line-through">
            ₹ {new Intl.NumberFormat("en-IN").format(orginalPrice)}
          </h3>
          <h2 className="text-2xl">
            ₹ {new Intl.NumberFormat("en-IN").format(dicountedPrice)}
          </h2>
          <h3 className="text-gray-400 text-sm">
            {duration != 1 && (
              <>
                ₹{" "}
                {new Intl.NumberFormat("en-IN").format(
                  Math.trunc(dicountedPrice / duration)
                )}{" "}
                per month
              </>
            )}
          </h3>
        </div>
      </div>

      <button className="border-gray-800 bg-gray-800/[.7] my-3 p-2 border rounded-md w-full">
        Buy Now
      </button>
      <hr className="border-gray-800" />

      {/* FEATURES */}
      <div className="mt-2">
        <h3 className="font-semibold uppercase">Features</h3>

        <div className="space-y-1 mt-1 text-[15px]">
          {features[duration].map((feature, i) => (
            <p key={i} className="flex items-center gap-1.5 text-gray-400">
              <span className="place-items-center border-gray-800 grid bg-gray-800/[.7] border rounded-full w-5 h-5">
                <CheckIcon className="h-2.5" />
              </span>
              {feature}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = {
  1: ["Unlimited 24/7 Access", "Unlimted Free Weights"],
  3: [
    "Get Free 1 month extension",
    "Unlimited 24/7 Access",
    "Unlimted Free Weights",
  ],
  6: [
    "Get Free 1.5 month extension",
    "Get Free active wear",
    "Unlimited 24/7 Access",
    "Unlimted Free Weights",
  ],
  12: [
    "Get Free 2 month extension",
    "Get 1 month subscription freeze",
    "Get 10% off on supplements",
    "Get Free active wear",
    "Unlimited 24/7 Access",
    "Unlimted Free Weights",
  ],
  24: [
    "Get Free 4 month extension",
    "Get 2 month subscription freeze",
    "Get 15% off on supplements",
    "Get Free active wear",
    "Unlimited 24/7 Access",
    "Unlimted Free Weights",
  ],
};

export default PricingForm;
