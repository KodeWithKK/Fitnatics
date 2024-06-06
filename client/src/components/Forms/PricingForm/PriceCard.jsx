import { CheckIcon } from "./Icons";

function PriceCard({ duration, orginalPrice, dicountedPrice }) {
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
      >
        Buy Now
      </button>
      <hr className="border-gray-800" />

      {/* FEATURES */}
      <div className="mt-2">
        <p className="font-semibold uppercase">Features</p>

        <div className="space-y-1 mt-1 text-[15px]">
          {features[duration].map((feature, i) => (
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

export default PriceCard;
