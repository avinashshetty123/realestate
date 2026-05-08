"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: "Michael Chen",
    role: "First-Time Homebuyer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    text: "PropVista made buying my first home completely stress-free. The team guided me through every step with patience and expertise.",
  },
  {
    name: "Amanda Rodriguez",
    role: "Commercial Investor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    text: "Their investment advisory team helped me identify opportunities that grew my portfolio by 40% in two years. Exceptional service.",
  },
  {
    name: "David Thompson",
    role: "Property Seller",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    text: "Sold above asking price in just 3 weeks. The marketing strategy and negotiation skills were outstanding.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[current];

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 bg-navy">
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-20 opacity-0">
          <h2 className="text-5xl font-black text-white mb-6">
            Client <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-xl text-white/60">Real experiences from real people</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="w-12 h-12 text-teal/30 mx-auto mb-8" />
              
              <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-12 italic">
                "{testimonial.text}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="text-white font-bold text-lg">{testimonial.name}</div>
                  <div className="text-teal text-sm">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex justify-center gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-teal w-8" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}