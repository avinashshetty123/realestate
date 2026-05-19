"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const SOCIAL_LINKS = [
  {
    label: "Facebook", href: "https://facebook.com/propvista", color: "hover:bg-blue-600",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: "Instagram", href: "https://instagram.com/propvista", color: "hover:bg-pink-600",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    label: "Twitter / X", href: "https://twitter.com/propvista", color: "hover:bg-sky-500",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "LinkedIn", href: "https://linkedin.com/company/propvista", color: "hover:bg-blue-700",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "YouTube", href: "https://youtube.com/@propvista", color: "hover:bg-red-600",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
  },
  {
    label: "WhatsApp", href: "https://wa.me/919595771672", color: "hover:bg-green-600",
    svg: <MessageCircle className="w-4 h-4" />,
  },
];

const NAV_LINKS = ["Home", "About Us", "Vision & Mission", "Services", "Our Clients", "Contact"];
const SERVICES = ["Property Sales", "Investment Advisory", "Property Management", "Legal Support", "Property Valuation", "Commercial Real Estate"];

export function Footer() {
  const scrollTo = (label: string) => {
    const map: Record<string, string> = {
      "Home": "home",
      "About Us": "about",
      "Vision & Mission": "vision",
      "Services": "services",
      "Our Clients": "clients",
      "Contact": "contact",
    };
    const id = map[label];
    if (id) {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0a0f1e] text-white">
      {/* Social bar */}
      <div className="border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">Follow us on social media</p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                className={`w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center transition-colors ${s.color}`}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-teal to-teal-light rounded-xl flex items-center justify-center">
                <span className="font-black text-white text-lg">P</span>
              </div>
              <div>
                <p className="font-black text-lg leading-none">PropVista</p>
                <p className="text-xs text-white/40">Real Estate & Consultancy</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              India's trusted real estate partner — connecting you with the perfect property across all markets since 2008.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@propvista.in" className="flex items-center gap-2 text-white/50 hover:text-teal transition-colors">
                <Mail className="w-4 h-4 text-teal" /> info@propvista.in
              </a>
              <a href="tel:+919595771672" className="flex items-center gap-2 text-white/50 hover:text-teal transition-colors">
                <Phone className="w-4 h-4 text-teal" /> +91 95957 71672
              </a>
              <div className="flex items-center gap-2 text-white/50">
                <MapPin className="w-4 h-4 text-teal shrink-0" /> Mumbai, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Navigation</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className="text-white/50 hover:text-teal text-sm transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s} className="text-white/50 hover:text-teal text-sm transition-colors cursor-pointer">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Connect With Us</h4>
            <div className="grid grid-cols-3 gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-1.5 bg-white/5 rounded-xl p-3 transition-colors ${s.color} group`}
                >
                  <span className="text-white/60 group-hover:text-white transition-colors">{s.svg}</span>
                  <span className="text-[10px] text-white/40 group-hover:text-white/80 transition-colors">{s.label.split(" ")[0]}</span>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919595771672?text=Hello%20PropVista!"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors w-full justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} PropVista. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-white/30">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
