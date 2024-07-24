import {
  TotalMembersIcon,
  RevenueIcon,
  AttendanceIcon,
  ExpenceIcon,
} from "@shared/icons/Icons";

const SummaryCard = ({ type, children }) => {
  const Icon = data[type].Icon;

  return (
    <div className="flex w-[176px] items-start justify-between gap-2 rounded-md bg-gray-900/[.8] px-4 py-5">
      <div>
        <div className="w-[52px] rounded-full bg-gray-800/[.6] p-[13px]">
          <Icon />
        </div>
      </div>
      <div className="text-right font-semibold">
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
