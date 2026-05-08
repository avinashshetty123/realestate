"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center">
                <span className="font-black text-xl text-white">P</span>
              </div>
              <div>
                <div className="font-black text-xl">PropVista</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Real Estate & Consultancy</div>
              </div>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed mb-8">
              Your trusted partner in real estate — connecting you with the perfect property across all markets.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3 text-white/60">
                <Mail className="w-4 h-4 text-teal" />
                hello@propvista.com
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Phone className="w-4 h-4 text-teal" />
                +1 (555) 000-8888
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4 text-teal" />
                123 Main Street, Suite 400
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {["Services", "Properties", "About", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="hover:text-teal transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {["Property Sales", "Investment Advisory", "Property Management", "Legal Support"].map((service) => (
                <li key={service} className="hover:text-teal transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© 2026 PropVista. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}