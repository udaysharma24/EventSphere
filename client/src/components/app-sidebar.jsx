"use client"

import * as React from "react"
import {Mic, Wrench, Users, Award, CalendarDays, Dumbbell, GraduationCap, Factory, Building2, Frame, PieChart, Map, ChartNoAxesCombined} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Seminar",
      url: "/seminar",
      icon: Mic,
      isActive: true,
    },
    {
      title: "Workshop",
      url: "/workshop",
      icon: Wrench,
    },
    {
      title: "Conference",
      url: "/conference",
      icon: Users,
    },
    {
      title: "Expert Lecture",
      url: "/expert-lecture",
      icon: Award,
    },
    {
      title: "Summer Term Program",
      url: "#",
      icon: CalendarDays,
      items: [
        {
          title: "National",
          url: "/summer-term-program/national",
        },
        {
          title: "International",
          url: "/summer-term-program/international",
        },
      ],
    },
    {
      title: "Training Program",
      url: "/training-program",
      icon: Dumbbell,
    },
    {
      title: "Finishing School",
      url: "/finishing-school",
      icon: GraduationCap,
    },
    {
      title: "Development Programs",
      url: "#",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "FDP(Faculty Development Program)",
          url: "/development-program/faculty",
        },
        {
          title: "Administrative Development Program",
          url: "/development-program/administrative",
        },
        {
          title: "Executive Development Program",
          url: "/development-program/executive",
        },
      ],
    },
    {
      title: "Industrial Visit",
      url: "/industrial-visit",
      icon: Factory,
    },
    {
      title: "Foundation Day",
      url: "/foundation-day",
      icon: Building2,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const {state}= useSidebar()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src={state==="expanded"?"/Eventsphere.png":"/eventcanva_favicon.png"} alt="logo" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
