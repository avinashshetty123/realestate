"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About Us", href: "/about" },
  { id: "vision", label: "Vision & Mission", href: "/vision-mission" },
  { id: "services", label: "Services", href: "/services" },
  { id: "clients", label: "Our Clients", href: "/clients" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages with white backgrounds need dark navbar from start
  const whitePages = ['/about', '/vision-mission', '/services', '/clients'];
  const isWhitePage = whitePages.some(page => pathname.startsWith(page));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Always show solid navbar on white pages, or when scrolled
  const showSolidNav = isWhitePage || scrolled;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidNav ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-teal to-teal-light rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-black text-white text-lg">P</span>
              </div>
              <div>
                <p className={`font-black text-xl leading-none transition-colors ${showSolidNav ? "text-navy" : "text-white"}`}>
                  PropVista
                </p>
                <p className={`text-[11px] transition-colors ${showSolidNav ? "text-slate" : "text-white/70"}`}>
                  Real Estate Excellence
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.id} href={item.href}>
                <button
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive(item.href)
                      ? "bg-teal text-white shadow"
                      : showSolidNav
                      ? "text-navy hover:bg-slate-100 hover:text-teal"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-teal to-teal-light text-white px-6 py-2.5 rounded-xl font-bold shadow hover:shadow-lg transition-all text-sm">
                Get in Touch
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl ${showSolidNav ? "text-navy" : "text-white"}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link key={item.id} href={item.href}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                      isActive(item.href) ? "bg-teal text-white" : "text-navy hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
              <Link href="/contact">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-teal text-white px-4 py-3 rounded-xl font-bold mt-2 text-sm"
                >
                  Get in Touch
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
