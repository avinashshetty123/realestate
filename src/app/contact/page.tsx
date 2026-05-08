"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layouts/navbar";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="h-24" />

      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-bold font-heading mb-6">Let's Connect</h1>
              <p className="text-xl text-muted-foreground">
                Whether you're looking to buy, sell, invest, or consult, our team of experts is ready to guide you through every step of your property journey.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Email Us</p>
                  <p className="text-lg font-bold">concierge@luxeestate.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Call Us</p>
                  <p className="text-lg font-bold">+1 (555) 000-8888</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-xl bg-emerald/10 flex items-center justify-center text-emerald">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Our Headquarters</p>
                  <p className="text-lg font-bold">Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>

            {/* Social Media Integration */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase mb-6">Follow Our Journey</p>
              <div className="flex gap-4">
              {[
                { label: "Instagram", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Facebook", href: "#" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  whileHover={{ y: -5 }}
                  href={s.href}
                  className="h-12 px-4 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-sm font-medium hover:bg-emerald hover:text-white transition-all"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
            </div>
          </div>

          {/* Form Side */}
          <GlassCard className="p-10 shadow-premium border-emerald/10">
            <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">First Name</label>
                  <input type="text" placeholder="John" className="w-full rounded-xl bg-slate-50 dark:bg-white/5 p-4 focus:outline-none focus:ring-2 focus:ring-emerald/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full rounded-xl bg-slate-50 dark:bg-white/5 p-4 focus:outline-none focus:ring-2 focus:ring-emerald/20" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full rounded-xl bg-slate-50 dark:bg-white/5 p-4 focus:outline-none focus:ring-2 focus:ring-emerald/20" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Service Interested In</label>
                <select className="w-full rounded-xl bg-slate-50 dark:bg-white/5 p-4 focus:outline-none focus:ring-2 focus:ring-emerald/20 appearance-none">
                  <option>Property Purchase</option>
                  <option>Property Sale</option>
                  <option>Sales Consultancy</option>
                  <option>Investment Advisory</option>
                  <option>Commercial Property</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Your Message</label>
                <textarea rows={5} placeholder="Tell us about your requirements..." className="w-full rounded-xl bg-slate-50 dark:bg-white/5 p-4 focus:outline-none focus:ring-2 focus:ring-emerald/20" />
              </div>

              <AnimatedButton className="w-full py-6 rounded-xl bg-emerald text-white text-lg font-bold">
                Send Inquiry
              </AnimatedButton>
            </form>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
