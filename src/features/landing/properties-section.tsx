"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bed, Bath, Square, MapPin, IndianRupee, Filter, Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PROPERTIES = [
  {
    id: "1",
    title: "Luxury 3BHK in Bandra West",
    location: "Bandra West, Mumbai",
    price: 28500000, // ₹2.85 Cr
    priceLabel: "₹2.85 Cr",
    type: "residential",
    beds: 3, baths: 3, sqft: 1450,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop",
    tag: "Premium",
    tagColor: "bg-gold text-white",
    city: "mumbai",
  },
  {
    id: "2",
    title: "Commercial Office Space",
    location: "Connaught Place, Delhi",
    price: 52000000, // ₹5.2 Cr
    priceLabel: "₹5.2 Cr",
    type: "commercial",
    beds: 0, baths: 2, sqft: 3200,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    tag: "Prime Location",
    tagColor: "bg-teal text-white",
    city: "delhi",
  },
  {
    id: "3",
    title: "Independent Villa",
    location: "Whitefield, Bangalore",
    price: 18500000, // ₹1.85 Cr
    priceLabel: "₹1.85 Cr",
    type: "residential",
    beds: 4, baths: 4, sqft: 2800,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop",
    tag: "Villa",
    tagColor: "bg-blue-500 text-white",
    city: "bangalore",
  },
  {
    id: "4",
    title: "2BHK Ready to Move",
    location: "Hinjewadi, Pune",
    price: 8500000, // ₹85 Lakh
    priceLabel: "₹85 Lakh",
    type: "residential",
    beds: 2, baths: 2, sqft: 1100,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    tag: "Ready to Move",
    tagColor: "bg-green-500 text-white",
    city: "pune",
  },
  {
    id: "5",
    title: "Retail Showroom Space",
    location: "Commercial Street, Bangalore",
    price: 15000000, // ₹1.5 Cr
    priceLabel: "₹1.5 Cr",
    type: "commercial",
    beds: 0, baths: 1, sqft: 1800,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    tag: "High Footfall",
    tagColor: "bg-orange-500 text-white",
    city: "bangalore",
  },
  {
    id: "6",
    title: "Residential Plot",
    location: "Sector 150, Noida",
    price: 12000000, // ₹1.2 Cr
    priceLabel: "₹1.2 Cr",
    type: "plots",
    beds: 0, baths: 0, sqft: 2400,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop",
    tag: "Investment",
    tagColor: "bg-purple-500 text-white",
    city: "delhi",
  },
];

const CITIES = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Pune"];
const PROPERTY_TYPES = ["All Types", "Residential", "Commercial", "Plots"];
const PRICE_RANGES = [
  { label: "All Budgets", min: 0, max: Infinity },
  { label: "Under ₹50 Lakh", min: 0, max: 5000000 },
  { label: "₹50L - ₹1 Cr", min: 5000000, max: 10000000 },
  { label: "₹1 - ₹2 Cr", min: 10000000, max: 20000000 },
  { label: "₹2 - ₹5 Cr", min: 20000000, max: 50000000 },
  { label: "Above ₹5 Cr", min: 50000000, max: Infinity },
];

export function PropertiesSection() {
  const [filters, setFilters] = useState({
    city: "All Cities",
    type: "All Types",
    priceRange: "All Budgets",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
      });

      gsap.fromTo(
        gridRef.current?.querySelectorAll(".property-card") ?? [],
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filteredProperties = PROPERTIES.filter((property) => {
    const cityMatch = filters.city === "All Cities" || 
      property.city.toLowerCase() === filters.city.toLowerCase();
    
    const typeMatch = filters.type === "All Types" || 
      property.type === filters.type.toLowerCase();
    
    const priceRange = PRICE_RANGES.find(range => range.label === filters.priceRange);
    const priceMatch = !priceRange || 
      (property.price >= priceRange.min && property.price <= priceRange.max);
    
    const searchMatch = !filters.search || 
      property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      property.location.toLowerCase().includes(filters.search.toLowerCase());

    return cityMatch && typeMatch && priceMatch && searchMatch;
  });

  return (
    <section id="properties" ref={sectionRef} className="py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-teal to-teal-light text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
          >
            Featured Properties
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black text-navy mb-8 leading-tight">
            Premium Properties
            <br />
            <span className="bg-gradient-to-r from-teal via-teal-light to-blue-500 bg-clip-text text-transparent">
              Across India
            </span>
          </h2>
          <p className="text-xl text-slate max-w-4xl mx-auto leading-relaxed">
            Discover handpicked residential, commercial, and investment properties 
            in Mumbai, Delhi, Bangalore, Pune, and other prime locations.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="text"
                  placeholder="Search by location, property name..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-xl hover:bg-teal-light transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t"
                >
                  {/* City Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">City</label>
                    <select
                      value={filters.city}
                      onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30"
                    >
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Property Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30"
                    >
                      {PROPERTY_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Budget Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                      className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/30"
                    >
                      {PRICE_RANGES.map(range => (
                        <option key={range.label} value={range.label}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate">
              Showing <span className="font-bold text-navy">{filteredProperties.length}</span> properties
            </p>
            <button 
              onClick={() => window.location.href = '/properties'}
              className="text-teal font-semibold hover:text-teal-light transition-colors"
            >
              View All Properties →
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="property-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${property.tagColor}`}>
                      {property.tag}
                    </span>
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 text-white font-bold text-lg">
                      <IndianRupee className="w-5 h-5" />
                      {property.priceLabel.replace("₹", "")}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-slate text-sm mb-2">
                    <MapPin className="w-4 h-4 text-teal" />
                    {property.location}
                  </div>
                  
                  <h3 className="font-bold text-lg text-navy mb-4 group-hover:text-teal transition-colors line-clamp-2">
                    {property.title}
                  </h3>

                  {/* Property Details */}
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <div className="flex gap-4 text-sm text-slate">
                      {property.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          {property.beds}
                        </span>
                      )}
                      {property.baths > 0 && (
                        <span className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          {property.baths}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        {property.sqft} sqft
                      </span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = `/properties/${property.id}`}
                      className="text-teal font-semibold text-sm hover:text-teal-light transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate" />
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4">No Properties Found</h3>
            <p className="text-slate mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={() => setFilters({ city: "All Cities", type: "All Types", priceRange: "All Budgets", search: "" })}
              className="bg-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-light transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-navy to-navy-light rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Looking for Something Specific?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Can't find the perfect property? Our experts will help you discover hidden gems 
              that match your exact requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal to-teal-light text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Get Personalized Recommendations
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-navy transition-all"
              >
                Schedule Site Visit
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}