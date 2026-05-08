"use client";

import { motion } from "framer-motion";
import { Search, MapPin, DollarSign, Home, SlidersHorizontal } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";

export function FilterSidebar() {
  return (
    <GlassCard className="h-fit w-full space-y-8 p-8 md:w-80" hoverEffect={false}>
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold">Filters</h3>
        <SlidersHorizontal className="h-5 w-5 text-emerald" />
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Address, City, Zip..."
              className="w-full rounded-xl bg-white/5 py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Min"
              className="rounded-xl bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald"
            />
            <input
              type="text"
              placeholder="Max"
              className="rounded-xl bg-white/5 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Property Type</label>
          <div className="flex flex-wrap gap-2">
            {["Villa", "Penthouse", "Condo", "Office"].map((type) => (
              <button
                key={type}
                className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium hover:bg-emerald hover:text-white transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Amenities</label>
          <div className="space-y-2">
            {["Pool", "Gym", "Parking", "Smart Home"].map((amenity) => (
              <label key={amenity} className="flex items-center gap-3 text-sm cursor-pointer group">
                <input type="checkbox" className="accent-emerald" />
                <span className="group-hover:text-emerald transition-colors">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <AnimatedButton className="w-full rounded-xl bg-emerald text-white">
          Apply Filters
        </AnimatedButton>
        
        <button className="w-full text-center text-xs font-medium text-muted-foreground hover:text-emerald transition-colors">
          Reset All
        </button>
      </div>
    </GlassCard>
  );
}
