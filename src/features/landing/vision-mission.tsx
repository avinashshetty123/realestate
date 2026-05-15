"use client";

import { motion } from "framer-motion";
import { Eye, Target, CheckCircle } from "lucide-react";

const GOALS = [
  "Make property transactions transparent and hassle-free",
  "Leverage technology to simplify real estate decisions",
  "Build long-term relationships based on trust",
  "Deliver exceptional value to every client",
];

export function VisionMissionSection() {
  return (
    <section id="vision" className="py-24 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal/10 text-teal text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-navy leading-tight">
            Vision & Mission
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-navy rounded-3xl p-10 text-white"
          >
            <div className="w-14 h-14 bg-teal/20 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-teal" />
            </div>
            <h3 className="text-2xl font-black mb-4">Our Vision</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              To be India's most trusted and innovative real estate platform — making property transactions transparent, efficient, and accessible for every Indian family, regardless of budget or location.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-teal to-teal-light rounded-3xl p-10 text-white"
          >
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-black mb-4">Our Mission</h3>
            <p className="text-white/90 leading-relaxed text-lg">
              Empowering Indians to make informed real estate decisions through expert guidance, cutting-edge technology, and unmatched customer service — across all major cities and property types.
            </p>
          </motion.div>
        </div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm"
        >
          <h3 className="text-2xl font-black text-navy mb-8 text-center">What We Stand For</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {GOALS.map((goal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-teal mt-0.5 shrink-0" />
                <span className="text-slate">{goal}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
