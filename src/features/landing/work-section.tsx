"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Users, 
  Building, 
  Home,
  ArrowLeft,
  ArrowRight,
  ExternalLink
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Luxury Residences at Bandra West",
    location: "Mumbai, Maharashtra",
    type: "Residential",
    value: "₹450 Crores",
    units: "180 Apartments",
    completion: "2023",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
    description: "Premium 2-4 BHK apartments with world-class amenities including swimming pool, gym, and landscaped gardens.",
    features: ["Sea-facing apartments", "Premium amenities", "Vastu compliant", "RERA approved"],
  },
  {
    id: 2,
    title: "Tech Park Commercial Complex",
    location: "Whitefield, Bangalore",
    type: "Commercial",
    value: "₹320 Crores",
    units: "2.5 Lakh Sq Ft",
    completion: "2023",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    description: "State-of-the-art commercial complex designed for IT companies with modern infrastructure and facilities.",
    features: ["IT-ready infrastructure", "24/7 security", "Ample parking", "Food court"],
  },
  {
    id: 3,
    title: "Green Valley Independent Villas",
    location: "Gurgaon, Haryana",
    type: "Residential",
    value: "₹280 Crores",
    units: "85 Villas",
    completion: "2024",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop",
    description: "Luxurious independent villas with private gardens, modern architecture, and premium finishes.",
    features: ["Private gardens", "Modern architecture", "Gated community", "Club house"],
  },
  {
    id: 4,
    title: "Metro Mall & Retail Complex",
    location: "Connaught Place, Delhi",
    type: "Commercial",
    value: "₹520 Crores",
    units: "3.8 Lakh Sq Ft",
    completion: "2022",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    description: "Premium retail and commercial space in the heart of Delhi with excellent connectivity and footfall.",
    features: ["Prime location", "Metro connectivity", "High footfall", "Anchor tenants"],
  },
  {
    id: 5,
    title: "Riverside Apartments",
    location: "Pune, Maharashtra",
    type: "Residential",
    value: "₹180 Crores",
    units: "220 Apartments",
    completion: "2024",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    description: "Modern apartments with river views, eco-friendly design, and comprehensive amenities for urban living.",
    features: ["River views", "Eco-friendly", "Modern amenities", "Good connectivity"],
  },
  {
    id: 6,
    title: "Industrial Park Development",
    location: "Chennai, Tamil Nadu",
    type: "Industrial",
    value: "₹380 Crores",
    units: "15 Lakh Sq Ft",
    completion: "2023",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    description: "Comprehensive industrial park with manufacturing units, warehouses, and logistics facilities.",
    features: ["Manufacturing units", "Logistics facilities", "Power backup", "Security systems"],
  },
];

const CATEGORIES = ["All", "Residential", "Commercial", "Industrial"];

export function OurWorkSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(project => project.type === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        projectsRef.current?.querySelectorAll(".project-card") ?? [],
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1,
          scrollTrigger: { trigger: projectsRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="work" ref={sectionRef} className="py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-teal to-teal-light text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
          >
            Our Portfolio
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black text-navy mb-8 leading-tight">
            Successful Projects
            <br />
            <span className="bg-gradient-to-r from-teal via-teal-light to-blue-500 bg-clip-text text-transparent">
              Across India
            </span>
          </h2>
          <p className="text-xl text-slate max-w-4xl mx-auto leading-relaxed">
            Over ₹2000+ Crores worth of successful real estate projects delivered across 
            Mumbai, Delhi, Bangalore, Pune, and other major Indian cities.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentSlide(0);
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-teal to-teal-light text-white shadow-lg"
                    : "text-slate hover:text-teal"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Project Slider */}
        <div className="mb-20">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Image */}
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={filteredProjects[currentSlide]?.image}
                    alt={filteredProjects[currentSlide]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                      filteredProjects[currentSlide]?.type === "Residential" ? "bg-blue-500" :
                      filteredProjects[currentSlide]?.type === "Commercial" ? "bg-teal" : "bg-orange-500"
                    }`}>
                      {filteredProjects[currentSlide]?.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-12">
                  <h3 className="text-3xl font-bold text-navy mb-4">
                    {filteredProjects[currentSlide]?.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate mb-6">
                    <MapPin className="w-5 h-5 text-teal" />
                    {filteredProjects[currentSlide]?.location}
                  </div>

                  <p className="text-slate leading-relaxed mb-8">
                    {filteredProjects[currentSlide]?.description}
                  </p>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="flex items-center gap-2 text-teal font-bold text-lg">
                        <IndianRupee className="w-5 h-5" />
                        {filteredProjects[currentSlide]?.value}
                      </div>
                      <div className="text-sm text-slate">Project Value</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-navy font-bold text-lg">
                        <Building className="w-5 h-5" />
                        {filteredProjects[currentSlide]?.units}
                      </div>
                      <div className="text-sm text-slate">Total Units</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-bold text-navy mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {filteredProjects[currentSlide]?.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate">
                          <div className="w-1.5 h-1.5 bg-teal rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-teal to-teal-light text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
            >
              <ArrowRight className="w-5 h-5 text-navy" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? "bg-teal w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, 6).map((project, idx) => (
            <motion.div
              key={project.id}
              className="project-card group"
              whileHover={{ y: -10 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      project.type === "Residential" ? "bg-blue-500" :
                      project.type === "Commercial" ? "bg-teal" : "bg-orange-500"
                    }`}>
                      {project.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-teal transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-teal font-bold">
                      <IndianRupee className="w-4 h-4" />
                      {project.value.replace("₹", "")}
                    </div>
                    <div className="text-sm text-slate">
                      {project.completion}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-navy to-navy-light rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-12">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "₹2000+", label: "Crores Worth Projects" },
              { value: "50+", label: "Completed Projects" },
              { value: "10,000+", label: "Happy Families" },
              { value: "25+", label: "Cities Covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-teal mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}