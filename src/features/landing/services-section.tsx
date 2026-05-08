"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Home, 
  Building2, 
  TrendingUp, 
  FileText, 
  Shield, 
  Users,
  MapPin,
  Calculator,
  Handshake,
  Award,
  Clock,
  IndianRupee
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Home,
    title: "Residential Properties",
    desc: "Find your dream home - apartments, villas, independent houses across Mumbai, Delhi, Bangalore & more",
    features: ["1BHK to 5BHK apartments", "Independent villas", "Gated communities", "Ready-to-move & under construction"],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    desc: "Premium office spaces, retail outlets, warehouses and commercial complexes for your business needs",
    features: ["Office spaces", "Retail showrooms", "Warehouses", "Co-working spaces"],
    color: "from-teal to-teal-light",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    desc: "Expert guidance on high-ROI properties, market analysis and investment strategies across India",
    features: ["Market analysis", "ROI calculations", "Investment planning", "Portfolio management"],
    color: "from-green-500 to-green-600",
  },
  {
    icon: Calculator,
    title: "Property Valuation",
    desc: "Accurate property valuation services using latest market data and government approved rates",
    features: ["Market rate analysis", "Government valuation", "Comparative analysis", "Investment potential"],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: FileText,
    title: "Legal Documentation",
    desc: "Complete legal support for property transactions, title verification and documentation",
    features: ["Title verification", "Legal clearance", "Registration support", "Documentation"],
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Handshake,
    title: "Property Management",
    desc: "End-to-end property management services including maintenance, tenant management and rent collection",
    features: ["Tenant management", "Rent collection", "Maintenance", "Legal compliance"],
    color: "from-red-500 to-red-600",
  },
];

const PROCESS_STEPS = [
  { step: "01", title: "Consultation", desc: "Free consultation to understand your requirements" },
  { step: "02", title: "Property Search", desc: "Curated property options based on your criteria" },
  { step: "03", title: "Site Visits", desc: "Organized site visits with our expert team" },
  { step: "04", title: "Documentation", desc: "Complete legal verification and documentation" },
  { step: "05", title: "Closure", desc: "Smooth transaction closure and handover" },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Services animation
      gsap.fromTo(
        servicesRef.current?.querySelectorAll(".service-card") ?? [],
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: servicesRef.current, start: "top 80%", once: true },
        }
      );

      // Process steps animation
      gsap.fromTo(
        processRef.current?.querySelectorAll(".process-step") ?? [],
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: processRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-white overflow-hidden">
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
            Our Services
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black text-navy mb-8 leading-tight">
            Complete Real Estate
            <br />
            <span className="bg-gradient-to-r from-teal via-teal-light to-blue-500 bg-clip-text text-transparent">
              Solutions for India
            </span>
          </h2>
          <p className="text-xl text-slate max-w-4xl mx-auto leading-relaxed">
            From finding your dream home to making smart investments, we provide end-to-end 
            real estate services across major Indian cities with complete transparency and expertise.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              className="service-card group"
              whileHover={{ y: -10, rotateY: 5 }}
              style={{ perspective: "1000px" }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-500 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-teal transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate leading-relaxed mb-6">
                  {service.desc}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate">
                      <div className="w-1.5 h-1.5 bg-teal rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-gradient-to-r from-slate-100 to-slate-200 text-navy py-3 rounded-xl font-semibold hover:from-teal hover:to-teal-light hover:text-white transition-all"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-r from-navy to-navy-light rounded-3xl p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Proven Process</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              A systematic approach that has helped thousands of Indian families find their perfect properties
            </p>
          </motion.div>

          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                className="process-step text-center relative"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal to-teal-light rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black shadow-lg">
                  {step.step}
                </div>
                <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-teal/50 to-transparent" />
                )}
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
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-navy mb-4">Ready to Start Your Property Journey?</h3>
            <p className="text-slate mb-8 max-w-2xl mx-auto">
              Get expert guidance from India's most trusted real estate consultancy. 
              Free consultation and property recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal to-teal-light text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-teal text-teal px-8 py-4 rounded-xl font-bold hover:bg-teal hover:text-white transition-all"
              >
                View Properties
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}