"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your PropVista AI Assistant with real-time access to our property database. I can help you find properties, check availability, get pricing information, and answer questions about our services. Try asking 'Show me available properties' or 'Properties in Mumbai'. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("propvista") || message.includes("about") || message.includes("company")) {
      return "PropVista is India's leading real estate consultancy with 15+ years of experience. We've successfully completed ₹2000+ Crores worth of projects across Mumbai, Delhi, Bangalore, Pune, and other major cities. We specialize in residential, commercial, and investment properties with a 98% customer satisfaction rate.";
    }
    
    if (message.includes("testimonial") || message.includes("review") || message.includes("feedback")) {
      return "Our clients love us! Here are some highlights: 'PropVista helped me find my dream home in Mumbai within my budget' - Priya Sharma. 'Excellent service for commercial property investment' - Rajesh Kumar. 'Professional team, transparent process' - Anita Patel. We have 2500+ happy clients with 98% satisfaction rate.";
    }
    
    if (message.includes("pune")) {
      return "Great choice! Pune has excellent investment opportunities. We have properties in Hinjewadi (IT hub), Baner, Wakad, and Kharadi. Prices range from ₹60L-₹3Cr. Popular areas include: Hinjewadi IT Park vicinity (₹80L-₹2Cr), Baner (₹1Cr-₹3Cr), Wakad (₹70L-₹1.5Cr). Would you like residential or commercial properties?";
    }
    
    if (message.includes("mumbai")) {
      return "Mumbai is our specialty! We have premium properties in Bandra, Andheri, Powai, and Thane. Luxury apartments start from ₹2.5Cr in Bandra, ₹1.8Cr in Andheri, and ₹1.2Cr in Thane. Great connectivity and appreciation potential. Which area interests you most?";
    }
    
    if (message.includes("bangalore") || message.includes("bengaluru")) {
      return "Bangalore offers excellent tech-city properties! Whitefield (₹80L-₹2Cr), Electronic City (₹60L-₹1.5Cr), Hebbal (₹1Cr-₹2.5Cr), and Sarjapur Road (₹70L-₹1.8Cr). Perfect for IT professionals with great ROI potential. Looking for ready-to-move or under-construction?";
    }
    
    if (message.includes("delhi") || message.includes("ncr") || message.includes("gurgaon") || message.includes("noida")) {
      return "Delhi NCR has premium options! Gurgaon: DLF, Cyber City area (₹1.5Cr-₹5Cr). Noida: Sector 62, 137 (₹80L-₹2.5Cr). New Delhi: Central locations (₹3Cr+). Great connectivity via metro. Which specific area are you considering?";
    }
    
    if (message.includes("price") || message.includes("cost") || message.includes("budget")) {
      return "Our property prices vary by location: Mumbai (₹1.2Cr-₹10Cr+), Delhi NCR (₹80L-₹5Cr), Bangalore (₹60L-₹2.5Cr), Pune (₹60L-₹3Cr), Chennai (₹50L-₹2Cr), Hyderabad (₹40L-₹1.8Cr). We have options for every budget with flexible payment plans. What's your preferred budget range?";
    }
    
    if (message.includes("residential") || message.includes("apartment") || message.includes("flat") || message.includes("home")) {
      return "We have amazing residential options! 1BHK (₹40L-₹1.2Cr), 2BHK (₹60L-₹2.5Cr), 3BHK (₹1Cr-₹5Cr), 4BHK+ Luxury (₹2Cr-₹10Cr+). Features include modern amenities, parking, security, gym, swimming pool. Ready-to-move and under-construction both available. Which configuration interests you?";
    }
    
    if (message.includes("commercial") || message.includes("office") || message.includes("shop") || message.includes("retail")) {
      return "Excellent commercial opportunities! Office spaces (₹50L-₹5Cr), Retail shops (₹30L-₹2Cr), Warehouses (₹1Cr-₹10Cr). Prime locations in business districts with high footfall. Expected rental yields: 6-10% annually. Looking to buy or lease?";
    }
    
    if (message.includes("investment") || message.includes("roi") || message.includes("return")) {
      return "Smart investment choice! Our properties offer 8-12% annual ROI. Best investment areas: Pune IT corridor (12% growth), Bangalore tech parks (10% growth), Mumbai suburbs (8-10% growth). We also offer pre-launch projects with 20-30% appreciation potential. Investment budget range?";
    }
    
    if (message.includes("loan") || message.includes("finance") || message.includes("emi")) {
      return "We assist with home loans! Partner banks offer up to 90% financing at 8.5-9.5% interest rates. EMI calculator: ₹1Cr loan = ₹95,000/month EMI (20 years). Required documents: Income proof, ID, bank statements. Our relationship managers help with quick approvals. Need loan assistance?";
    }
    
    if (message.includes("amenities") || message.includes("facilities")) {
      return "Our properties feature premium amenities: Swimming pool, Gym, Clubhouse, Children's play area, 24/7 security, Power backup, Parking, Landscaped gardens, Jogging track, Community hall. Luxury projects also include: Spa, Tennis court, Concierge services, Smart home features.";
    }
    
    if (message.includes("contact") || message.includes("call") || message.includes("meet") || message.includes("visit")) {
      return "Let's connect! 📞 Call: +91 95957 71672 | 📧 Email: info@propvista.in | 🏢 Office: Mumbai, Maharashtra. Our property consultants are available 24/7. We also offer free site visits and virtual property tours. Would you like to schedule a consultation?";
    }
    
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Welcome to PropVista! 🏠 I'm excited to help you find your perfect property. We're India's trusted real estate partner with 15+ years of experience. Are you looking for residential, commercial, or investment properties?";
    }
    
    if (message.includes("thank")) {
      return "You're most welcome! 😊 I'm here whenever you need property assistance. Feel free to ask about specific locations, prices, or schedule a site visit. Have a great day and happy house hunting!";
    }
    
    // Default response with more helpful information
    return "I can help you with property searches, pricing, locations (Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad), investment advice, loan assistance, and more! Try asking about: 'Properties in [city]', 'Investment options', 'Residential apartments', 'Commercial spaces', or 'PropVista services'. What interests you most?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // Try to get response from database-connected API
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentMessage })
      });
      
      const data = await response.json();
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.success ? data.response : getBotResponse(currentMessage),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      // Fallback to local responses if API fails
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(currentMessage),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className={`fixed bottom-6 right-24 z-50 bg-white rounded-2xl shadow-2xl border overflow-hidden transition-all duration-300 flex flex-col ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">PropVista AI Assistant</h3>
              {!isMinimized && (
                <p className="text-sm opacity-90">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white p-1"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{ minHeight: 0 }}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isBot
                          ? "bg-white text-gray-800 shadow-sm"
                          : "bg-purple-500 text-white"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isBot ? "text-gray-500" : "text-purple-100"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white p-3 rounded-2xl shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about properties, prices, locations..."
                  className="flex-1 p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-500 text-sm"
                  rows={1}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}