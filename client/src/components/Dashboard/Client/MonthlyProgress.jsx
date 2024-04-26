import { MothlyProgressIcon } from "../../../Icons";

const MonthlyProgress = () => {
  return (
    <div className="mt-8 mx-6 py-4 px-8 bg-gray-900/[.8] rounded-md ">
      <h3 className="mb-6 font-bold text-center">Monthly Progress</h3>
      <div className="relative">
        <MothlyProgressIcon className="w-[240px] text-gray-600 " />
        <div className="absolute right-[27.5%] bottom-1 text-center">
          <p className="text-[32px] font-semibold">56%</p>
          <p className="text-xs -ml-1">You have achived</p>
        </div>
      </div>
      <p className="mt-8 text-sm text-center text-pretty text-gray-400">
        You have reached 56% goal this month
      </p>
    </div>
  );
};

export default MonthlyProgress;
