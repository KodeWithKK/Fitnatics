import {
  TotalMembersIcon,
  RevenueIcon,
  AttendanceIcon,
  ExpenceIcon,
} from "../../../Icons";

const SummaryCard = ({ type, children }) => {
  const Icon = data[type].Icon;

  return (
    <div className="flex items-start justify-between gap-2 w-[176px] bg-gray-900/[.8] rounded-md px-4 py-5">
      <div>
        <div className="rounded-full w-[52px] p-[13px] bg-gray-800/[.6]">
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
