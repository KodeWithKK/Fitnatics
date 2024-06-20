import { useContext } from "react";
import { CheckIcon } from "./Icons";
import useMakePayment from "@hooks/useMakePayment";
import { GettingStartedContext } from "@pages/GettingStartedPage/GettingStartedPage";

function PriceCard({
  productId,
  type: productType,
  duration,
  orginalPrice,
  dicountedPrice,
  features,
}) {
  const { setupAccountHandler } = useContext(GettingStartedContext);
  const { buyButtonHandler } = useMakePayment({
    productId,
    productType,
    callbackFn: setupAccountHandler,
  });

  return (
    <div className="border-gray-900 bg-gray-950 p-4 border rounded-md w-[306px] select-none shrink-0">
      {/* HEADER */}
      <div className="flex justify-between">
        <div className="text-center">
          <h1 className="font-semibold text-5xl">{duration}</h1>
          <p className="font-medium text-lg uppercase">
            {duration == 1 ? "Month" : "Months"}
          </p>
        </div>
        <div className="text-right font-medium">
          <p className="text-gray-400 text-sm line-through">
            ₹ {new Intl.NumberFormat("en-IN").format(orginalPrice)}
          </p>
          <h2 className="text-2xl">
            ₹ {new Intl.NumberFormat("en-IN").format(dicountedPrice)}
          </h2>
          <p className="text-gray-400 text-sm">
            {duration != 1 && (
              <>
                ₹{" "}
                {new Intl.NumberFormat("en-IN").format(
                  Math.trunc(dicountedPrice / duration)
                )}{" "}
                per month
              </>
            )}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="border-gray-800 bg-gray-800/[.7] my-3 p-2 border rounded-md w-full select-none"
        onClick={buyButtonHandler}
      >
        Buy Now
      </button>

      <hr className="border-gray-800" />

      {/* FEATURES */}
      <div className="mt-2">
        <p className="font-semibold uppercase">Features</p>

        <div className="space-y-1 mt-1 text-[15px]">
          {features.map((feature, i) => (
            <p
              key={i}
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
    </div>
  );
}

export default PriceCard;
