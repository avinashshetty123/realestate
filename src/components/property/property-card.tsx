"use client";

import { motion } from "framer-motion";
import { Bed, Bath, Square, Heart, Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    image: string;
    isPremium?: boolean;
    isVerified?: boolean;
  };
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-500 hover:shadow-premium dark:bg-card",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {property.isPremium && (
            <span className="flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <Star className="h-3 w-3 fill-white" />
              Premium
            </span>
          )}
          {property.isVerified && (
            <span className="flex items-center gap-1 rounded-full bg-emerald/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Verified
            </span>
          )}
        </div>

        <button className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-heading text-2xl font-bold text-emerald">
            {property.price}
          </span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {property.location}
          </div>
        </div>

        <h3 className="mb-4 font-heading text-lg font-semibold tracking-tight transition-colors group-hover:text-emerald">
          {property.title}
        </h3>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bed className="h-4 w-4" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bath className="h-4 w-4" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Square className="h-4 w-4" />
            <span>{property.sqft}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
