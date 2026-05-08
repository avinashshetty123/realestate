"use client";

import { Navbar } from "@/components/layouts/navbar";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, TrendingUp, Home } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const stats = [
  { value: "$4B+", label: "Total Transactions" },
  { value: "12K+", label: "Properties Sold" },
  { value: "150+", label: "Expert Agents" },
  { value: "25+", label: "Years of Experience" },
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "Head of Residential Sales",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "James Okafor",
    role: "Commercial Property Advisor",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Priya Sharma",
    role: "Investment Strategist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="h-24" />

      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-white/5">
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-emerald blur-3xl" />
          <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-bold uppercase tracking-widest text-emerald"
          >
            Who We Are
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold font-heading mt-3 mb-6"
          >
            Real Estate &{" "}
            <span className="text-emerald">Consultancy</span>
            <br />You Can Trust
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            From first homes to large-scale commercial deals — we guide every client with expertise, transparency, and genuine care.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 border-emerald/10 h-full hover:border-emerald/30 transition-colors">
              <div className="h-14 w-14 rounded-2xl bg-emerald/10 flex items-center justify-center text-emerald mb-6">
                <Eye className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the most trusted real estate and sales consultancy — empowering every client to make confident property decisions, regardless of budget or scale.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 border-blue-500/10 h-full hover:border-blue-500/30 transition-colors">
              <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To deliver expert market insights, honest consultancy, and seamless transactions — making property buying, selling, and investing accessible to everyone.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-matte-black text-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-4xl font-bold text-emerald">{stat.value}</p>
              <p className="text-sm text-white/50 uppercase tracking-widest mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-emerald">Our People</span>
          <h2 className="text-4xl font-bold font-heading mt-2">
            Meet the <span className="text-emerald">Team</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
