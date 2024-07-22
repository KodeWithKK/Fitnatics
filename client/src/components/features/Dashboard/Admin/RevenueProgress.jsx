import { MothlyProgressIcon } from "@shared/Icons/Icons";

const RevenueProgress = () => {
  return (
    <div className="bg-gray-900/[.8] mx-6 mt-8 px-8 py-4 rounded-md">
      <h3 className="mb-6 font-bold text-center">Revenue Goal</h3>
      <div className="relative">
        <MothlyProgressIcon className="w-[240px] text-gray-600" />
        <div className="right-[27.5%] bottom-1 absolute text-center">
          <p className="font-semibold text-[32px]">42%</p>
          <p className="-ml-1 text-xs">You have achived</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-center text-gray-400 text-pretty">
        You have achived 42% revenue goal of this year
      </p>
    </div>
  );
};

export default RevenueProgress;
