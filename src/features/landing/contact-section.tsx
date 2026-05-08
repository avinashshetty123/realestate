"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "Property Purchase",
  "Property Sale", 
  "Investment Advisory",
  "Commercial Property",
  "Property Management",
  "Other",
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", service: SERVICES[0], message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Submission failed");
      }
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", phone: "", service: SERVICES[0], message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto opacity-0">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-navy mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="text-xl text-slate">Ready to start your property journey? Let's talk.</p>
          </div>

          {status === "success" ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Message Sent!</h3>
              <p className="text-slate mb-8">We'll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus("idle")}
                className="px-8 py-3 bg-teal text-white rounded-full font-bold hover:bg-teal-light transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-8">Contact Information</h3>
                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: "Email", value: "hello@propvista.com" },
                      { icon: Phone, label: "Phone", value: "+1 (555) 000-8888" },
                      { icon: MapPin, label: "Address", value: "123 Main Street, Suite 400" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm text-slate">{item.label}</div>
                          <div className="font-bold text-navy">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <h4 className="font-bold text-navy mb-4">Office Hours</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate">Monday – Friday</span>
                      <span className="text-teal font-medium">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate">Saturday</span>
                      <span className="text-teal font-medium">10:00 AM – 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate">Sunday</span>
                      <span className="text-slate/50">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">First Name</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Last Name</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Phone (Optional)</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Service</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                    >
                      {SERVICES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm">{errorMsg}</div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-teal text-white rounded-xl font-bold hover:bg-teal-light transition-all disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}