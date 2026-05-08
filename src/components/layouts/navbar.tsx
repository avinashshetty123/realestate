"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Our Work", href: "#work" },
  { name: "Why Choose Us", href: "#why-choose" },
  { name: "Vision & Mission", href: "#vision-mission" },
  { name: "Testimonials", href: "#testimonials" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NAV_LINKS.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollTo("#home")}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal to-teal-light flex items-center justify-center shadow-lg">
              <span className="font-black text-xl text-white">P</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={cn(
              "font-black text-xl tracking-tight transition-colors",
              !isScrolled ? "text-white" : "text-navy"
            )}>
              PropVista
            </span>
            <span className={cn(
              "text-[10px] font-semibold uppercase tracking-wider transition-colors",
              !isScrolled ? "text-white/70" : "text-teal"
            )}>
              Real Estate India
            </span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link.name}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo(link.href)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all relative",
                activeSection === link.href.replace("#", "")
                  ? "text-teal"
                  : !isScrolled 
                    ? "text-white/80 hover:text-white" 
                    : "text-navy/70 hover:text-teal"
              )}
            >
              {link.name}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Contact Info & CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-4 text-sm">
            <a
              href="tel:+919876543210"
              className={cn(
                "flex items-center gap-2 font-medium transition-colors",
                !isScrolled ? "text-white/80 hover:text-white" : "text-navy/70 hover:text-teal"
              )}
            >
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <a
              href="mailto:hello@propvista.in"
              className={cn(
                "flex items-center gap-2 font-medium transition-colors",
                !isScrolled ? "text-white/80 hover:text-white" : "text-navy/70 hover:text-teal"
              )}
            >
              <Mail className="w-4 h-4" />
              hello@propvista.in
            </a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("#contact")}
            className="px-6 py-3 bg-gradient-to-r from-teal to-teal-light text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Get Quote
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={cn("lg:hidden p-2 rounded-xl", !isScrolled ? "text-white" : "text-navy")}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/95 backdrop-blur-xl border-t px-6 pb-6 pt-4 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-navy hover:bg-teal/10 hover:text-teal transition-all font-semibold"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => scrollTo("#contact")}
                className="mt-4 w-full py-3 bg-gradient-to-r from-teal to-teal-light text-white rounded-xl font-bold"
              >
                Get Quote
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}