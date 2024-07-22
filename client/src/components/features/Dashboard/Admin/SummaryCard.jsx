import {
  TotalMembersIcon,
  RevenueIcon,
  AttendanceIcon,
  ExpenceIcon,
} from "@shared/icons/Icons";

const SummaryCard = ({ type, children }) => {
  const Icon = data[type].Icon;

  return (
    <div className="flex justify-between items-start gap-2 bg-gray-900/[.8] px-4 py-5 rounded-md w-[176px]">
      <div>
        <div className="bg-gray-800/[.6] p-[13px] rounded-full w-[52px]">
          <Icon />
        </div>
      </div>
      <div className="font-semibold text-right">
        <h3 className="mb-3 text-sm text-gray-400">{data[type].text}</h3>
        <h2 className="text-[18px]">{children}</h2>
      </div>
    </div>
  );
};

const data = {
  total_members: {
    text: "Total Members",
    Icon: TotalMembersIcon,
  },
  revenue: {
    text: "Revenue",
    Icon: RevenueIcon,
  },
  attendance: {
    text: "Attendance",
    Icon: AttendanceIcon,
  },
  expense: {
    text: "Expense",
    Icon: ExpenceIcon,
  },
};

export default SummaryCard;
