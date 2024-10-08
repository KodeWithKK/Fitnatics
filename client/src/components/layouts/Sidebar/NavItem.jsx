import {
  DashboardSolidIcon,
  DashboardOutlineIcon,
  TrainerIcon,
  CommunitiesSolidIcon,
  CommunitiesOutlineIcon,
  SupplementsSolidIcon,
  SupplementsOutlineIcon,
  DietPlannerSolidIcon,
  DietPlannerOutlineIcon,
  BlogsSolidIcon,
  BlogsOutlineIcon,
  AnnouncementSolidIcon,
  AnnouncementOutlineIcon,
} from "@shared/icons/Icons";

function NavItem({ isActive, type, children }) {
  const Icon = isActive ? IconMap[`${type}-solid`] : IconMap[`${type}-outline`];

  return (
    <div
      className={`flex h-[48px] cursor-pointer items-center rounded-md ${
        isActive ? "bg-brand/[.2]" : "hover:bg-brand/[.2]"
      }`}
    >
      <Icon
        className={`ml-[20px] mr-3 h-5 w-5 ${isActive ? "text-brand" : ""}`}
      />
      <p>{children}</p>
    </div>
  );
}

const IconMap = {
  "dashboard-solid": DashboardSolidIcon,
  "dashboard-outline": DashboardOutlineIcon,
  "trainer-solid": TrainerIcon,
  "trainer-outline": TrainerIcon,
  "supplements-solid": SupplementsSolidIcon,
  "supplements-outline": SupplementsOutlineIcon,
  "communities-solid": CommunitiesSolidIcon,
  "communities-outline": CommunitiesOutlineIcon,
  "diet-planner-solid": DietPlannerSolidIcon,
  "diet-planner-outline": DietPlannerOutlineIcon,
  "fitness-blogs-solid": BlogsSolidIcon,
  "fitness-blogs-outline": BlogsOutlineIcon,
  "announcements-solid": AnnouncementSolidIcon,
  "announcements-outline": AnnouncementOutlineIcon,
};

export default NavItem;
