"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Bot, Plus, X } from "lucide-react";

interface FloatingActionButtonProps {
  onAIAssistantClick: () => void;
}

export function FloatingActionButton({ onAIAssistantClick }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in your real estate services. Can you help me find the right property?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleCall = () => {
    window.open('tel:+919876543210', '_self');
    setIsOpen(false);
  };

  const handleAIAssistant = () => {
    onAIAssistantClick();
    setIsOpen(false);
  };

  const actions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      onClick: handleWhatsApp,
    },
    {
      icon: Phone,
      label: "Call Us",
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: handleCall,
    },
    {
      icon: Bot,
      label: "AI Assistant",
      color: "bg-purple-500 hover:bg-purple-600",
      onClick: handleAIAssistant,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 20, 
                  scale: 0.8,
                  transition: { delay: (actions.length - index - 1) * 0.05 }
                }}
                className="flex items-center gap-3"
              >
                {/* Label */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white px-4 py-2 rounded-full shadow-lg border"
                >
                  <span className="text-sm font-semibold text-navy whitespace-nowrap">
                    {action.label}
                  </span>
                </motion.div>
                
                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={action.onClick}
                  className={`w-14 h-14 ${action.color} text-white rounded-full shadow-lg flex items-center justify-center transition-colors`}
                >
                  <action.icon className="w-6 h-6" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-teal to-teal-light text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}