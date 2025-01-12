"use client";

import * as React from "react";
import {
  Book,
  Building,
  CalendarRange,
  // Cog,
  Command,
  Compass,
  Headphones,
  Home,
  LogOut,
  // MapPinHouseIcon,
  Mic2,
  // Text,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarSeparator,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
import Image from "next/image";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Salvation mimistries",
      logo: Command,
      plan: "Glory reign",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Compass,
      role: ["admin", "attendee", "minister", "convert", "testimony"],
    },
    {
      title: "Attendees",
      url: "/dashboard/attendees",
      icon: Book,
      role: ["admin", "attendee"],
    },
    {
      title: "Ministers",
      url: "/dashboard/ministers",
      icon: Mic2,
      role: ["admin", "minister"],
    },
    {
      title: "Altar Call",
      url: "/dashboard/altar-call",
      icon: Building,
      role: ["admin", "convert"],
    },
    {
      title: "First Timers",
      url: "/dashboard/first-timers",
      icon: Home,
      role: ["admin", "convert"],
    },
    {
      title: "Testimonies",
      url: "/dashboard/testimonies",
      icon: CalendarRange,
      role: ["admin", "testimony"],
    },
    // {
    //   title: "Viewing Centres",
    //   url: "/dashboard/viewing-centres",
    //   icon: MapPinHouseIcon,
    // },
    // {
    //   title: "Reports",
    //   url: "#",
    //   icon: Text,
    //   role: ["admin"],
    // },
  ],
  projects: [
    {
      name: "Help & Support",
      url: "mailto:gloryreign2025@gmail.com",
      icon: Headphones,
    },
    // {
    //   name: "Settings",
    //   url: "#",
    //   icon: Cog,
    // },
  ],
};

export function AppSidebar({
  role,
  ...props
}: React.ComponentProps<typeof Sidebar> & { role: string }) {
  return (
    <Sidebar variant='inset' collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='h-20 hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:!p-0'>
              <Image
                src='/imgs/GR25-logo.png'
                alt=''
                width={80}
                height={80}
                className='h-full'
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} role={role} />
        {/* <SidebarSeparator />
        <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut({ redirect: true, redirectTo: "/" })}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
