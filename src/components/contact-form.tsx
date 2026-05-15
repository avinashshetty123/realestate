"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      alert("Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const msg = `Hi PropVista! I'm ${form.name || "interested"} and would like to enquire about your services.`;
    window.open(`https://wa.me/919595771672?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-teal/20 text-teal text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Contact Us</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ready to find your dream property? Our experts are here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <CheckCircle className="w-16 h-16 text-teal mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 mb-6">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-teal text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-teal-light transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-sm font-semibold mb-1.5">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-teal text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-semibold mb-1.5">Phone *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-teal text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-teal text-sm"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-semibold mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-teal resize-none text-sm"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal to-teal-light text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white font-bold py-3.5 px-5 rounded-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact details */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-7">
              <h3 className="text-white font-bold text-lg mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: "+91 95957 71672" },
                  { icon: Mail, label: "Email", value: "info@propvista.in" },
                  { icon: MapPin, label: "Office", value: "Mumbai, Maharashtra, India" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">{item.label}</p>
                      <p className="text-white font-semibold text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919595771672?text=Hello%20PropVista!%20I%20am%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366] rounded-3xl p-7 hover:bg-green-500 transition-colors group"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Chat on WhatsApp</p>
                <p className="text-white/80 text-sm">Get instant replies — available 24/7</p>
              </div>
            </a>

            {/* Business hours */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-7">
              <h3 className="text-white font-bold mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Mon – Fri</span>
                  <span className="text-white font-semibold">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Saturday</span>
                  <span className="text-white font-semibold">10:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sunday</span>
                  <span className="text-white font-semibold">By Appointment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
