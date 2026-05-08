"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyType: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyType: "residential"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: "", email: "", phone: "", message: "", propertyType: "residential" });
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${formData.propertyType} properties. My name is ${formData.name || 'Customer'}.`;
    const whatsappUrl = `https://wa.me/919595771672?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Get in <span className="text-teal">Touch</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to find your dream property? Contact us today and let our experts guide you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal"
                    placeholder="+91 95957 71672"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-2">Property Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-teal"
                >
                  <option value="residential" className="bg-navy">Residential</option>
                  <option value="commercial" className="bg-navy">Commercial</option>
                  <option value="investment" className="bg-navy">Investment</option>
                  <option value="plots" className="bg-navy">Plots/Land</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 font-semibold mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-teal to-teal-light text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleWhatsApp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p className="text-white font-semibold">+91 95957 71672</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-semibold">info@propvista.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Office</p>
                    <p className="text-white font-semibold">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose PropVista?</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal rounded-full" />
                  15+ Years of Experience
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal rounded-full" />
                  5000+ Properties Listed
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal rounded-full" />
                  98% Customer Satisfaction
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal rounded-full" />
                  Pan-India Presence
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}