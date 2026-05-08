"use client";

import { motion } from "framer-motion";
import { PropertyCard } from "@/components/property/property-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowRight } from "lucide-react";

const PROPERTIES = [
  {
    id: "1",
    title: "Modern Family Home",
    location: "Austin, TX",
    price: "$680,000",
    beds: 4,
    baths: 3,
    sqft: "2,800 sqft",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
    isPremium: false,
    isVerified: true,
  },
  {
    id: "2",
    title: "Downtown Office Space",
    location: "Chicago, IL",
    price: "$2,400,000",
    beds: 0,
    baths: 2,
    sqft: "5,200 sqft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    isPremium: true,
    isVerified: true,
  },
  {
    id: "3",
    title: "Beachfront Villa",
    location: "Miami, FL",
    price: "$4,900,000",
    beds: 5,
    baths: 5,
    sqft: "6,100 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    isPremium: true,
    isVerified: true,
  },
];

export function FeaturedProperties() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-black/50">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold uppercase tracking-widest text-emerald"
            >
              Hand-Picked Listings
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 font-heading text-4xl font-bold tracking-tight text-matte-black dark:text-white md:text-5xl"
            >
              Featured <span className="text-emerald">Properties</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Explore our curated selection of residential, commercial, and investment properties across top markets.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <AnimatedButton variant="outline" className="rounded-full border-2 border-emerald/20 text-emerald hover:bg-emerald hover:text-white">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
