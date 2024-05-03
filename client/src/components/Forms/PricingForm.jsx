import React from "react";
import StepsTracker from "./atoms/StepsTracker";
import { CheckIcon } from "./atoms/Icons";

const PricingForm = ({ formData }) => {
  return (
    <div className="bg-gray-950 px-[6%] py-8 h-screen overflow-y-auto">
      <div className="mb-6 text-center">
        <a
          className="font-bold text-4xl text-brand uppercase tracking-wide"
          href="/"
        >
          Fitnatics
        </a>
      </div>

      <StepsTracker totalSteps={4} currentStep={4} />

      {/* CARDS CONTAINER */}
      <div className="flex justify-between gap-2">
        <PriceCard duration={1} orginalPrice={1599} dicountedPrice={1199} />
        <PriceCard duration={3} orginalPrice={3499} dicountedPrice={3199} />
      </div>
    </div>
  );
};

function PriceCard({ duration, orginalPrice, dicountedPrice }) {
  return (
    <div className="border-2 border-gray-600 p-4 rounded-md w-[306px]">
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
                  Math.trunc(dicountedPrice / 3)
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
  3: ["Unlimited 24/7 Access", "Unlimted Free Weights"],
};

export default PricingForm;
