import SummaryCard from "./SummaryCard";
import AttendanceChart from "./AttendanceChart";
import RevenueProgress from "./RevenueProgress";
import MemberAdditionChart from "./MemberAdditionChart";

const Dashboard = () => {
  return (
    <>
      {/* COLOUMN - 1 */}
      <div className="w-[768px] shrink-0 overflow-y-auto px-8 pt-8">
        {/* Summary */}
        <h3 className="mb-3 font-bold">Summary</h3>
        <div className="flex gap-2">
          <SummaryCard type="total_members">48</SummaryCard>
          <SummaryCard type="revenue">&#8377; 18K</SummaryCard>
          <SummaryCard type="attendance">32</SummaryCard>
          <SummaryCard type="expense">&#8377; 2.6K</SummaryCard>
        </div>

        {/* Attendance */}
        <h3 className="mb-3 mt-6 font-bold">Attendance</h3>
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
