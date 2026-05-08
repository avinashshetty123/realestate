"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Home, IndianRupee, TrendingUp, Users, Award } from "lucide-react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    title: "Premium Homes in Mumbai",
    subtitle: "Luxury apartments starting from ₹2.5 Cr",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    title: "Commercial Spaces in Bangalore",
    subtitle: "Office spaces from ₹50 Lakh",
  },
  {
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    title: "Investment Properties in Delhi NCR",
    subtitle: "High ROI properties from ₹1 Cr",
  },
];

const QUICK_STATS = [
  { icon: Home, value: "5000+", label: "Properties Listed", color: "text-teal" },
  { icon: Users, value: "2500+", label: "Happy Clients", color: "text-blue-500" },
  { icon: Award, value: "15+", label: "Years Experience", color: "text-orange-500" },
  { icon: TrendingUp, value: "98%", label: "Success Rate", color: "text-green-500" },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [searchData, setSearchData] = useState({
    location: "",
    type: "residential",
    budget: "50-100",
  });
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    // Preload all slide images
    SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isClient]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.type) params.append('type', searchData.type);
    if (searchData.budget) params.append('budget', searchData.budget);
    
    window.location.href = `/properties?${params.toString()}`;
  };

  if (!isClient) {
    return (
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-navy">
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none">
            Find Your Dream
            <br />
            <span className="bg-gradient-to-r from-teal via-teal-light to-blue-400 bg-clip-text text-transparent">
              Property in India
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover premium residential, commercial & investment properties across Mumbai, Delhi, Bangalore & more
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-navy-light to-teal">
      {/* Background Slideshow - Optimized */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[current].image}
              alt={SLIDES[current].title}
              className="h-full w-full object-cover will-change-opacity"
              loading="eager"
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/70 to-navy/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-teal/20 backdrop-blur-md border border-teal/30 rounded-full px-6 py-2 mb-8"
        >
          <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
          <span className="text-teal font-semibold text-sm">India's Trusted Real Estate Partner</span>
        </motion.div>

        {/* Main Title */}
        <h1 
          ref={titleRef} 
          className="text-6xl md:text-8xl font-black text-white mb-6 leading-none"
        >
          Find Your Dream
          <br />
          <span className="bg-gradient-to-r from-teal via-teal-light to-blue-400 bg-clip-text text-transparent">
            Property in India
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover premium residential, commercial & investment properties across Mumbai, Delhi, Bangalore & more
        </p>

        {/* Enhanced Search Bar */}
        <motion.div ref={searchRef} className="">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-3 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl">
                <MapPin className="w-5 h-5 text-teal shrink-0" />
                <div className="flex-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Location</label>
                  <select 
                    value={searchData.location}
                    onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-transparent text-white text-sm focus:outline-none w-full"
                  >
                    <option value="" className="bg-navy">Select City</option>
                    <option value="mumbai" className="bg-navy">Mumbai</option>
                    <option value="delhi" className="bg-navy">Delhi NCR</option>
                    <option value="bangalore" className="bg-navy">Bangalore</option>
                    <option value="pune" className="bg-navy">Pune</option>
                    <option value="hyderabad" className="bg-navy">Hyderabad</option>
                    <option value="chennai" className="bg-navy">Chennai</option>
                  </select>
                </div>
              </div>

              {/* Property Type */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl">
                <Home className="w-5 h-5 text-teal shrink-0" />
                <div className="flex-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Type</label>
                  <select 
                    value={searchData.type}
                    onChange={(e) => setSearchData(prev => ({ ...prev, type: e.target.value }))}
                    className="bg-transparent text-white text-sm focus:outline-none w-full"
                  >
                    <option value="residential" className="bg-navy">Residential</option>
                    <option value="commercial" className="bg-navy">Commercial</option>
                    <option value="plots" className="bg-navy">Plots/Land</option>
                    <option value="investment" className="bg-navy">Investment</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl">
                <IndianRupee className="w-5 h-5 text-teal shrink-0" />
                <div className="flex-1">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Budget</label>
                  <select 
                    value={searchData.budget}
                    onChange={(e) => setSearchData(prev => ({ ...prev, budget: e.target.value }))}
                    className="bg-transparent text-white text-sm focus:outline-none w-full"
                  >
                    <option value="50-100" className="bg-navy">₹50L - ₹1Cr</option>
                    <option value="100-250" className="bg-navy">₹1Cr - ₹2.5Cr</option>
                    <option value="250-500" className="bg-navy">₹2.5Cr - ₹5Cr</option>
                    <option value="500+" className="bg-navy">₹5Cr+</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal to-teal-light text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {QUICK_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((slide, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrent(i)}
            className={`relative overflow-hidden rounded-full transition-all duration-500 ${
              i === current ? "w-12 h-3 bg-teal" : "w-3 h-3 bg-white/30"
            }`}
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-light to-teal"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-teal rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
}