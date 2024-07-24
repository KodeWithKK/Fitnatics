import { useContext } from "react";
import { CheckIcon } from "./Icons";
import useMakePayment from "@hooks/useMakePayment";
import { OnboardingContext } from "@pages/OnboardingPage/OnboardingPage";

function PriceCard({
  productId,
  type: productType,
  duration,
  orginalPrice,
  dicountedPrice,
  features,
}) {
  const { setupAccountHandler } = useContext(OnboardingContext);
  const { buyButtonHandler } = useMakePayment({
    productId,
    productType,
    callbackFn: setupAccountHandler,
  });

  return (
    <div className="w-[306px] shrink-0 select-none rounded-md border border-gray-900 bg-gray-950 p-4">
      <Header
        duration={duration}
        orginalPrice={orginalPrice}
        dicountedPrice={dicountedPrice}
      />

      <button
        type="button"
        className="my-3 w-full select-none rounded-md border border-gray-800 bg-gray-800/[.7] p-2"
        onClick={buyButtonHandler}
      >
        Buy Now
      </button>

      <hr className="border-gray-800" />

      <Features features={features} />
    </div>
  );
}

function Header({ duration, orginalPrice, dicountedPrice }) {
  return (
    <div className="flex justify-between">
      <div className="text-center">
        <h1 className="text-5xl font-semibold">{duration}</h1>
        <p className="text-lg font-medium uppercase">
          {duration == 1 ? "Month" : "Months"}
        </p>
      </div>
      <div className="text-right font-medium">
        <p className="text-sm text-gray-400 line-through">
          ₹ {getFormatedPrice(orginalPrice)}
        </p>
        <h2 className="text-2xl">₹ {getFormatedPrice(dicountedPrice)}</h2>
        <p className="text-sm text-gray-400">
          {duration != 1 && (
            <>
              ₹ {getFormatedPrice(Math.trunc(dicountedPrice / duration))} per
              month
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function Features({ features }) {
  return (
    <div className="mt-2">
      <p className="font-semibold uppercase">Features</p>

      <div className="mt-1 space-y-1 text-[15px]">
        {features.map((feature) => (
          <p
            key={window.crypto.randomUUID()}
            className="flex items-center gap-1.5 text-[14px] text-gray-400"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full border border-gray-800 bg-gray-800/[.7]">
              <CheckIcon className="h-2.5" />
            </span>
            {feature}
          </p>
        ))}
      </div>
    </div>
  );
}

function getFormatedPrice(price) {
  return new Intl.NumberFormat("en-IN").format(price);
}

export default PriceCard;
