"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  LockIcon,
  Icon,
  LucideIcon,
  Home,
  X,
  Briefcase,
  Search,
  Settings,
  User,
  Users,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/state/api";
import { usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const sidebarLinksArray = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Briefcase, label: "Timeline", href: "/timeline" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: User, label: "Users", href: "/users" },
    { icon: Users, label: "Teams", href: "/teams" },
  ];

  const prioritySidebarLinksArray = [
    { icon: AlertCircle, label: "Urgent", href: "/priority/urgent" },
    { icon: ShieldAlert, label: "High", href: "/priority/high" },
    { icon: AlertTriangle, label: "Medium", href: "/priority/medium" },
    { icon: AlertOctagon, label: "Low", href: "/priority/low" },
    { icon: Layers3, label: "Backlog", href: "/priority/backlog" },
  ];

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
  transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white  ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold tracking-tighter text-gray-800 dark:text-white">
            PLANWISE
          </div>

          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              SHAILLY's TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="dark-text-gray-400 mt-[0.1rem] h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>

        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          {sidebarLinksArray.map((link, index) => (
            <SidebarLink
              key={index}
              icon={link.icon}
              label={link.label}
              href={link.href}
            />
          ))}
        </nav>

        {/* PROJECTS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* PROJECTS LIST */}

        {showProjects &&
          projects?.map((project: Project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}

        {/* PRIORITIES LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {showPriority && (
          <>
            {prioritySidebarLinksArray.map((link, index) => (
              <SidebarLink
                key={index}
                icon={link.icon}
                label={link.label}
                href={link.href}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinksProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  const screenWidth = window.innerWidth;

  const onClick = () => {
    dispatch(setIsSidebarCollapsed(true));
  };

  return (
    <Link href={href} className="w-full" onClick={onClick}>
      <div
        className={`transition-color relative flex cursor-pointer items-center gap-3 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "dark:gray-600 bg-gray-100 text-white" : ""} justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
