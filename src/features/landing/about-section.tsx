"use client";

import { motion } from "framer-motion";
import { Shield, Heart, TrendingUp, Clock } from "lucide-react";

const VALUES = [
  { icon: Shield, title: "Trust & Transparency", desc: "Complete transparency in all dealings with zero hidden charges." },
  { icon: Heart, title: "Customer First", desc: "Your satisfaction is our priority — we always go the extra mile." },
  { icon: TrendingUp, title: "Market Expertise", desc: "15+ years of deep market knowledge across major Indian cities." },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance for all your property needs." },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-teal/10 text-teal text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              About PropVista
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-navy mb-6 leading-tight">
              India's Most Trusted
              <br />
              <span className="bg-gradient-to-r from-teal to-blue-500 bg-clip-text text-transparent">
                Real Estate Partner
              </span>
            </h2>
            <p className="text-slate text-lg leading-relaxed mb-6">
              Founded in 2008, PropVista has grown to become India's leading real estate consultancy. We've helped over 2,500 families find their dream homes and guided investors to make smart property decisions across 25+ cities.
            </p>
            <p className="text-slate leading-relaxed">
              Our team of 100+ certified real estate professionals brings unmatched expertise in residential, commercial, and investment properties — ensuring every transaction is smooth, transparent, and rewarding.
            </p>
          </motion.div>

          {/* Image / Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "2008", label: "Founded", color: "bg-navy text-white" },
              { value: "25+", label: "Cities Covered", color: "bg-teal text-white" },
              { value: "₹2000Cr+", label: "Projects Delivered", color: "bg-teal text-white" },
              { value: "50+", label: "Industry Awards", color: "bg-navy text-white" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-2xl p-6 text-center`}>
                <div className="text-3xl font-black mb-1">{s.value}</div>
                <div className="text-sm opacity-80">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-teal" />
              </div>
              <h3 className="font-bold text-navy mb-2">{v.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
