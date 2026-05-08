"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-soft transition-all duration-300",
        hoverEffect && "hover:border-emerald/40 hover:shadow-premium",
        className
      )}
    >
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
