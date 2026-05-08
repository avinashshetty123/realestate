"use client";

import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { Heart, Home, MessageSquare, Calendar, ChevronRight, TrendingUp } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { cn } from "@/lib/utils";

const DATA = [
  { name: "Jan", price: 4000 },
  { name: "Feb", price: 3000 },
  { name: "Mar", price: 2000 },
  { name: "Apr", price: 2780 },
  { name: "May", price: 1890 },
  { name: "Jun", price: 2390 },
  { name: "Jul", price: 3490 },
];

// Remove duplicate cn - use from lib/utils
export default function DashboardPage() {
  const stats = [
    { label: "Saved", value: "12", icon: Heart, color: "text-red-500" },
    { label: "Inquiries", value: "05", icon: MessageSquare, color: "text-emerald" },
    { label: "Scheduled", value: "02", icon: Calendar, color: "text-gold" },
  ];

  const recentProperty = {
    id: "1",
    title: "The Glass Pavilion",
    location: "Beverly Hills, CA",
    price: "$12,500,000",
    beds: 5,
    baths: 6,
    sqft: "8,500 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    isVerified: true,
  };

  return (
    <DashboardLayout role="buyer">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Welcome back, <span className="text-emerald">Alex</span></h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your property search.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex items-center gap-6 p-6">
                <div className={cn("p-4 rounded-2xl bg-white dark:bg-white/5 shadow-sm", stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activity */}
          <div className="lg:col-span-2 space-y-8">
            <GlassCard className="h-[400px]" hoverEffect={false}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">Market Trends</h3>
                  <p className="text-xs text-muted-foreground">Price index for Beverly Hills</p>
                </div>
                <div className="flex items-center gap-2 text-emerald">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-bold">+12.5%</span>
                </div>
              </div>
              <div className="h-[300px] w-full flex items-end justify-around gap-2">
                {DATA.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-emerald/30 rounded-t" style={{ height: `${(item.price / 4000) * 100}%` }}></div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recommended for You</h2>
                <button className="text-emerald text-sm font-bold flex items-center">
                  View All <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PropertyCard property={recentProperty} />
                <PropertyCard property={{...recentProperty, id: "2", title: "Skyline Penthouse", price: "$8,900,000", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"}} />
              </div>
            </section>
          </div>

          {/* Activity Feed */}
          <aside className="space-y-6">
             <GlassCard hoverEffect={false}>
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-6">
                  {[
                    { text: "Scheduled a visit for Glass Pavilion", time: "2 hours ago", icon: Calendar },
                    { text: "Saved Azure Bay Villa to favorites", time: "5 hours ago", icon: Heart },
                    { text: "New message from Agent Sarah", time: "1 day ago", icon: MessageSquare },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                        <activity.icon className="h-4 w-4 text-emerald" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </GlassCard>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Remove duplicate cn - use from lib/utils
