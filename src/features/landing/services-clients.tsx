"use client";

import { motion } from "framer-motion";
import { Building2, Briefcase, Map, Key, ShieldCheck, HeartHandshake, TrendingUp, Home } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function ServicesSection() {
  const services = [
    { title: "Property Sales", description: "Buy or sell residential and commercial properties with expert guidance at every step.", icon: Home },
    { title: "Sales Consultancy", description: "Strategic advice to maximize your property's value and close deals faster.", icon: Briefcase },
    { title: "Investment Advisory", description: "Data-driven insights to identify high-yield real estate investment opportunities.", icon: TrendingUp },
    { title: "Property Management", description: "End-to-end management of your assets — maintenance, tenants, and reporting.", icon: Key },
    { title: "Legal & Documentation", description: "Complete legal support, title verification, and documentation assistance.", icon: ShieldCheck },
    { title: "Relocation Services", description: "Seamless relocation support for individuals, families, and corporate clients.", icon: HeartHandshake },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-emerald"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold font-heading mt-2 mb-4"
          >
            Comprehensive <span className="text-emerald">Services</span>
          </motion.h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From first-time buyers to seasoned investors — we provide end-to-end real estate and consultancy services tailored to your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="p-8 h-full border-emerald/5 hover:border-emerald/30 hover:shadow-lg transition-all duration-300 group">
                <div className="h-12 w-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald mb-6 group-hover:bg-emerald group-hover:text-white transition-all duration-300">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientsSection() {
  const partners = [
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/f1/Google_logo_2015.svg/2560px-Google_logo_2015.svg.png" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
          Trusted by Leading Organizations
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((p) => (
            <img key={p.name} src={p.logo} alt={p.name} className="h-8 md:h-10 object-contain" />
          ))}
        </div>
      </div>
    </section>
  );
}
