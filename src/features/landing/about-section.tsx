"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Building, Award, TrendingUp, MapPin, Clock, Shield, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: "2008", title: "Founded in Mumbai", desc: "Started with a vision to transform Indian real estate" },
  { year: "2012", title: "Pan-India Expansion", desc: "Expanded to Delhi, Bangalore, and Pune" },
  { year: "2018", title: "Digital Revolution", desc: "Launched India's first AI-powered property platform" },
  { year: "2024", title: "Market Leader", desc: "Became India's most trusted real estate consultancy" },
];

const ACHIEVEMENTS = [
  { icon: Building, value: "5000+", label: "Properties Sold", color: "from-blue-500 to-blue-600" },
  { icon: Users, value: "2500+", label: "Happy Families", color: "from-green-500 to-green-600" },
  { icon: MapPin, value: "25+", label: "Cities Covered", color: "from-purple-500 to-purple-600" },
  { icon: Award, value: "50+", label: "Industry Awards", color: "from-orange-500 to-orange-600" },
];

const TEAM_VALUES = [
  { icon: Shield, title: "Trust & Transparency", desc: "Complete transparency in all dealings with zero hidden charges" },
  { icon: Heart, title: "Customer First", desc: "Your satisfaction is our priority, always going the extra mile" },
  { icon: TrendingUp, title: "Market Expertise", desc: "15+ years of deep market knowledge across major Indian cities" },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance for all your property needs" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animation
      gsap.fromTo(
        timelineRef.current?.querySelectorAll(".milestone") ?? [],
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.2,
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%", once: true },
        }
      );

      // Stats counter animation
      const counters = statsRef.current?.querySelectorAll(".counter-val");
      counters?.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") ?? "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString();
          },
        });
      });

      // Values cards animation
      gsap.fromTo(
        valuesRef.current?.querySelectorAll(".value-card") ?? [],
        { opacity: 0, y: 40, rotateX: -15 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: valuesRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
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
            About PropVista
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black text-navy mb-8 leading-tight">
            India's Most Trusted
            <br />
            <span className="bg-gradient-to-r from-teal via-teal-light to-blue-500 bg-clip-text text-transparent">
              Real Estate Partner
            </span>
          </h2>
          <p className="text-xl text-slate max-w-4xl mx-auto leading-relaxed">
            For over 15 years, we've been helping Indian families find their perfect homes and investors 
            discover lucrative opportunities across Mumbai, Delhi, Bangalore, Pune, and 20+ other cities.
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <div ref={timelineRef} className="mb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-navy text-center mb-16"
          >
            Our Journey of Excellence
          </motion.h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal to-teal-light rounded-full" />
            
            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                className={`milestone flex items-center mb-16 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all">
                    <div className="text-3xl font-black text-teal mb-2">{milestone.year}</div>
                    <h4 className="text-xl font-bold text-navy mb-3">{milestone.title}</h4>
                    <p className="text-slate leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal to-teal-light rounded-full border-4 border-white shadow-lg" />
                </div>
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Stats */}
        <div ref={statsRef} className="mb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-navy text-center mb-16"
          >
            Our Achievements Speak for Themselves
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((achievement) => (
              <motion.div
                key={achievement.label}
                whileHover={{ y: -10, rotateY: 5 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                  <achievement.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-black text-navy mb-2">
                  <span className="counter-val" data-target={parseInt(achievement.value.replace(/\D/g, ''))}>0</span>
                  {achievement.value.replace(/\d/g, '')}
                </div>
                <div className="text-slate font-semibold">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div ref={valuesRef}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-navy text-center mb-16"
          >
            Why Indian Families Choose Us
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TEAM_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="value-card group"
                whileHover={{ scale: 1.02, rotateX: 2 }}
                style={{ perspective: "1000px" }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all h-full">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal to-teal-light rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-slate leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-navy to-navy-light rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their perfect homes with PropVista
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal to-teal-light text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Start Your Property Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}