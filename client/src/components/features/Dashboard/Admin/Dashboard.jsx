import React from "react";
import SummaryCard from "./SummaryCard";
import AttendanceChart from "./AttendanceChart";
import RevenueProgress from "./RevenueProgress";
import MemberAdditionChart from "./MemberAdditionChart";

const Dashboard = () => {
  return (
    <>
      {/* COLOUMN - 1 */}
      <div className="overflow-y-auto w-[768px] pt-8 px-8 shrink-0">
        {/* Summary */}
        <h3 className="font-bold mb-3">Summary</h3>
        <div className="flex gap-2">
          <SummaryCard type="total_members">48</SummaryCard>
          <SummaryCard type="revenue">&#8377; 18K</SummaryCard>
          <SummaryCard type="attendance">32</SummaryCard>
          <SummaryCard type="expense">&#8377; 2.6K</SummaryCard>
        </div>

        {/* Attendance */}
        <h3 className="font-bold mt-6 mb-3">Attendance</h3>
        <AttendanceChart />
      </div>

      {/* COLOUMN - 2 */}
      <div className="flex-1 border-l-[1px] border-gray-900">
        <RevenueProgress />
        <MemberAdditionChart />
      </div>
    </>
  );
};

export default Dashboard;
