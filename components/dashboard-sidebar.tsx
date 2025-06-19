"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Activity, 
  History, 
  Settings, 
  HeartPulse, 
  BookText,
  LineChart
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: "Health Assistant",
    href: "/dashboard",
    icon: <Activity className="h-5 w-5" />
  },
  {
    title: "Risk Analysis",
    href: "/dashboard/risk-analysis",
    icon: <HeartPulse className="h-5 w-5" />
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: <History className="h-5 w-5" />
  },
  {
    title: "Health Trends",
    href: "/dashboard/trends",
    icon: <LineChart className="h-5 w-5" />
  },
  {
    title: "Resources",
    href: "/dashboard/resources",
    icon: <BookText className="h-5 w-5" />
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <div className="p-6">
        <Link href="/\" className="flex items-center gap-2 font-semibold">
          <Activity className="h-6 w-6 text-primary" />
          <span>HealthInsight AI</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-3">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "transparent"
            )}
          >
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}