"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const handleClick = () => {
    const msg = encodeURIComponent("Hello PropVista! I'm interested in your real estate services.");
    window.open(`https://wa.me/919595771672?text=${msg}`, "_blank");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
      title="Chat on WhatsApp"
      style={{ height: "52px", width: "52px" }}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white" />
      </span>
    </motion.button>
  );
}
