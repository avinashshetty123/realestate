"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const CLIENTS = [
  { name: "Tata Housing", initials: "TH", color: "bg-blue-600" },
  { name: "Godrej Properties", initials: "GP", color: "bg-green-600" },
  { name: "Lodha Group", initials: "LG", color: "bg-purple-600" },
  { name: "DLF Limited", initials: "DL", color: "bg-red-600" },
  { name: "Prestige Group", initials: "PG", color: "bg-orange-600" },
  { name: "Brigade Group", initials: "BG", color: "bg-teal" },
  { name: "Sobha Developers", initials: "SD", color: "bg-indigo-600" },
  { name: "Mahindra Lifespaces", initials: "ML", color: "bg-yellow-600" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "First-Time Homebuyer, Mumbai",
    avatar: "PS",
    color: "bg-pink-500",
    text: "PropVista made buying my first home completely stress-free. The team guided me through every step with patience and expertise. Found my dream 3BHK in Bandra within my budget!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Commercial Investor, Delhi",
    avatar: "RK",
    color: "bg-blue-500",
    text: "Their investment advisory team helped me identify opportunities that grew my portfolio by 40% in two years. Exceptional service and deep market knowledge.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    role: "Property Seller, Bangalore",
    avatar: "AP",
    color: "bg-green-500",
    text: "Sold my property above asking price in just 3 weeks. The marketing strategy and negotiation skills were outstanding. Highly recommend PropVista!",
    rating: 5,
  },
  {
    name: "Vikram Mehta",
    role: "NRI Investor, Pune",
    avatar: "VM",
    color: "bg-purple-500",
    text: "As an NRI, managing property from abroad was always a challenge. PropVista's end-to-end service made everything seamless. Truly professional team.",
    rating: 5,
  },
];

export function ClientsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <section id="clients" className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal/10 text-teal text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            Trusted By Many
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">Our Clients</h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            We've partnered with India's leading developers and helped thousands of families find their perfect homes.
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-20"
        >
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2"
            >
              <div className={`w-12 h-12 ${client.color} rounded-xl flex items-center justify-center`}>
                <span className="text-white font-black text-sm">{client.initials}</span>
              </div>
              <span className="text-xs text-slate text-center font-medium leading-tight">{client.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-black text-navy text-center mb-10">What Our Clients Say</h3>

          <div className="relative bg-white rounded-3xl shadow-lg p-10">
            <Quote className="w-10 h-10 text-teal/20 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-slate text-lg leading-relaxed mb-8 italic">
                  "{TESTIMONIALS[current].text}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${TESTIMONIALS[current].color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold">{TESTIMONIALS[current].avatar}</span>
                    </div>
                    <div>
                      <p className="font-bold text-navy">{TESTIMONIALS[current].name}</p>
                      <p className="text-sm text-slate">{TESTIMONIALS[current].role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-teal" : "w-2 bg-slate-200"}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
