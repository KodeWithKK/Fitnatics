import { MothlyProgressIcon } from "@shared/icons/Icons";

const RevenueProgress = () => {
  return (
    <div className="mx-6 mt-8 rounded-md bg-gray-900/[.8] px-8 py-4">
      <h3 className="mb-6 text-center font-bold">Revenue Goal</h3>
      <div className="relative">
        <MothlyProgressIcon className="w-[240px] text-gray-600" />
        <div className="absolute bottom-1 right-[27.5%] text-center">
          <p className="text-[32px] font-semibold">42%</p>
          <p className="-ml-1 text-xs">You have achived</p>
        </div>
      </div>
      <p className="mt-8 text-pretty text-center text-sm text-gray-400">
        You have achived 42% revenue goal of this year
      </p>
    </div>
  );
};

export default RevenueProgress;
