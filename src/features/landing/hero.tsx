"use client";

import { motion } from "framer-motion";
import { ArrowDown, Phone, Star } from "lucide-react";

import Link from "next/link";

export function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c5c 100%)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #2dd4bf 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-teal/20 border border-teal/30 rounded-full px-5 py-2 mb-8"
        >
          <Star className="w-4 h-4 text-teal fill-teal" />
          <span className="text-teal text-sm font-semibold">India's Trusted Real Estate Partner</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
        >
          Find Your Dream
          <br />
          <span className="bg-gradient-to-r from-teal via-teal-light to-blue-400 bg-clip-text text-transparent">
            Property in India
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium residential, commercial & investment properties across Mumbai, Delhi, Bangalore & more — with 15+ years of trusted expertise.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/contact">
            <button className="bg-gradient-to-r from-teal to-teal-light text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Get Free Consultation
            </button>
          </Link>
          <a
            href="https://wa.me/919595771672?text=Hello%20PropVista!%20I%20am%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-green-500 hover:scale-105 transition-all"
          >
            <Phone className="w-5 h-5" />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "15+", label: "Years Experience" },
            { value: "5000+", label: "Properties Listed" },
            { value: "2500+", label: "Happy Clients" },
            { value: "98%", label: "Success Rate" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-teal">{s.value}</div>
              <div className="text-xs text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <Link href="/about">
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </Link>
    </section>
  );
}
