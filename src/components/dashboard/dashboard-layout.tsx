"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Home, Heart, MessageSquare, Calendar, Settings, Menu, X, PlusCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

function SidebarItem({ icon: Icon, label, href, active, collapsed }: {
  icon: React.ElementType; label: string; href: string; active?: boolean; collapsed?: boolean;
}) {
  return (
    <Link href={href}>
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
        active ? "bg-teal text-white shadow-lg shadow-teal/20" : "text-slate-600 hover:bg-slate-100 hover:text-teal"
      )}>
        <Icon className={cn("h-5 w-5 shrink-0", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
        {!collapsed && <span className="font-medium text-sm">{label}</span>}
      </div>
    </Link>
  );
}

export function DashboardLayout({ children, role = "buyer" }: { children: React.ReactNode; role?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const buyerLinks = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Heart, label: "Saved Properties", href: "/dashboard/saved" },
    { icon: MessageSquare, label: "Inquiries", href: "/dashboard/inquiries" },
    { icon: Calendar, label: "Scheduled Visits", href: "/dashboard/visits" },
  ];

  const agentLinks = [
    { icon: LayoutDashboard, label: "Analytics", href: "/dashboard" },
    { icon: PlusCircle, label: "Add Property", href: "/dashboard/add" },
    { icon: Home, label: "My Listings", href: "/dashboard/listings" },
    { icon: MessageSquare, label: "Leads", href: "/dashboard/leads" },
    { icon: Users, label: "Clients", href: "/dashboard/clients" },
  ];

  const links = role === "agent" ? agentLinks : buyerLinks;
  const sidebarWidth = collapsed ? 80 : 280;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside
        style={{ width: `${sidebarWidth}px` }}
        className="fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 hidden md:flex flex-col overflow-hidden transition-all duration-300"
      >
        <div className="p-6 flex items-center justify-between shrink-0">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-teal flex items-center justify-center text-white font-black">P</div>
              <span className="font-black text-lg text-navy">PropVista</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-slate-100 rounded-lg ml-auto">
            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2">
          {links.map((link) => (
            <SidebarItem key={link.label} {...link} active={pathname === link.href} collapsed={collapsed} />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 shrink-0">
          <SidebarItem icon={Settings} label="Settings" href="/dashboard/settings" collapsed={collapsed} />
          <div className="mt-3 flex items-center gap-3 px-4 py-2">
            <div className="h-8 w-8 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold text-xs shrink-0">A</div>
            {!collapsed && <span className="text-sm font-medium text-slate-600">Admin</span>}
          </div>
        </div>
      </aside>

      <main className="flex-1 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-teal flex items-center justify-center text-white font-black text-sm">P</div>
          </Link>
          <div className="h-8 w-8 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold text-xs">A</div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
