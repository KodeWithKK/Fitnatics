import React from "react";
import NavItem from "./NavItem";

const SideBar = () => {
  return (
    <div className="bg-gray-900/[.75] w-[248px] h-screen">
      {/* LOGO */}
      <div className="mt-[30px] mb-[30px] px-[10%] text-center">
        <h1 className="font-bold text-[30px] text-brand uppercase tracking-wide">
          Fitnatics
        </h1>
      </div>

      {/* NAV-ITEMS */}
      <div className="space-y-[2px] px-[9%]">
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
