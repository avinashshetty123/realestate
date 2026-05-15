"use client";

import { motion } from "framer-motion";
import { Home, Building2, TrendingUp, FileText, Handshake, Calculator } from "lucide-react";

const SERVICES = [
  {
    icon: Home,
    title: "Residential Properties",
    desc: "Find your dream home — apartments, villas, and independent houses across all major Indian cities.",
    features: ["1BHK to 5BHK apartments", "Independent villas", "Gated communities", "Ready-to-move & under construction"],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    desc: "Premium office spaces, retail outlets, and commercial complexes for your business needs.",
    features: ["Office spaces", "Retail showrooms", "Warehouses", "Co-working spaces"],
    color: "from-teal to-teal-light",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    desc: "Expert guidance on high-ROI properties, market analysis, and investment strategies.",
    features: ["Market analysis", "ROI calculations", "Investment planning", "Portfolio management"],
    color: "from-green-500 to-green-600",
  },
  {
    icon: Calculator,
    title: "Property Valuation",
    desc: "Accurate property valuation using latest market data and government-approved rates.",
    features: ["Market rate analysis", "Government valuation", "Comparative analysis", "Investment potential"],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: FileText,
    title: "Legal Documentation",
    desc: "Complete legal support for property transactions, title verification, and documentation.",
    features: ["Title verification", "Legal clearance", "Registration support", "Documentation"],
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Handshake,
    title: "Property Management",
    desc: "End-to-end property management including maintenance, tenant management, and rent collection.",
    features: ["Tenant management", "Rent collection", "Maintenance", "Legal compliance"],
    color: "from-red-500 to-red-600",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal/10 text-teal text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-4 leading-tight">
            Our Services
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            From finding your dream home to making smart investments — complete real estate solutions under one roof.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${s.color} rounded-xl flex items-center justify-center mb-5`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{s.title}</h3>
              <p className="text-slate text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate">
                    <div className="w-1.5 h-1.5 bg-teal rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
