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
    <div className="border-gray-900 bg-gray-950 p-4 border rounded-md w-[306px] select-none shrink-0">
      <Header
        duration={duration}
        orginalPrice={orginalPrice}
        dicountedPrice={dicountedPrice}
      />

      <button
        type="button"
        className="border-gray-800 bg-gray-800/[.7] my-3 p-2 border rounded-md w-full select-none"
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
      <div className="font-medium text-right">
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

      <div className="space-y-1 mt-1 text-[15px]">
        {features.map((feature) => (
          <p
            key={window.crypto.randomUUID()}
            className="flex items-center gap-1.5 text-[14px] text-gray-400"
          >
            <span className="place-items-center border-gray-800 grid bg-gray-800/[.7] border rounded-full w-5 h-5">
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
