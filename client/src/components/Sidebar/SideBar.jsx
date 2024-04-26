import React from "react";
import NavItem from "./NavItem";

const SideBar = () => {
  return (
    <div className="w-[248px] bg-gray-900/[.75] h-screen">
      {/* LOGO */}
      <div className="text-center mt-[30px] mb-[30px] px-[10%]">
        <h1 className="font-bold text-[30px] text-brand uppercase tracking-wide">
          Fitnatics
        </h1>
      </div>

      {/* NAV-ITEMS */}
      <div className="px-[9%] space-y-[2px]">
        <NavItem isActive={true} type="dashboard">
          Dashboard
        </NavItem>
        <NavItem isActive={false} type="trainer">
          Trainer
        </NavItem>
        <NavItem isActive={false} type="supplements">
          Supplements
        </NavItem>
        <NavItem isActive={false} type="communities">
          Communities
        </NavItem>
        <NavItem isActive={false} type="diet-planner">
          Diet Planner
        </NavItem>
        <NavItem isActive={false} type="fitness-blogs">
          Fiteness Blogs
        </NavItem>
        <NavItem isActive={false} type="announcements">
          Announcements
        </NavItem>
      </div>
    </div>
  );
};

export default SideBar;
