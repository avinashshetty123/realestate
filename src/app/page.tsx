"use client";

import { useState } from "react";
import { Navbar } from "@/components/layouts/clean-navbar";
import { Footer } from "@/components/layouts/footer";
import { Hero } from "@/features/landing/hero";
import { AboutSection } from "@/features/landing/about-section";
import { ServicesSection } from "@/features/landing/services-section";
import { OurWorkSection } from "@/features/landing/work-section";
import { PropertiesSection } from "@/features/landing/properties-section";
import { TestimonialsSection } from "@/features/landing/testimonials-section";
import { ContactForm } from "@/components/contact-form";
import { FloatingActionButton } from "@/components/floating-action-button";
import { AIAssistant } from "@/components/ai-assistant";
import { AIChatbot } from "@/components/ui/ai-chatbot";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

// Placeholder sections for missing ones
function WhyChooseUsSection() {
  return (
    <section id="why-choose" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-black text-navy mb-8">
          Why Choose <span className="text-teal">PropVista</span>
        </h2>
        <p className="text-xl text-slate max-w-3xl mx-auto mb-16">
          15+ years of expertise, 5000+ successful transactions, and India's most trusted real estate consultancy
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl font-black text-teal">15+</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">Years Experience</h3>
            <p className="text-slate">Trusted expertise in Indian real estate market</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl font-black text-teal">5K+</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">Properties Listed</h3>
            <p className="text-slate">Extensive portfolio across major cities</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl font-black text-teal">98%</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">Success Rate</h3>
            <p className="text-slate">Customer satisfaction guaranteed</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-teal/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl font-black text-teal">24/7</span>
            </div>
            <h3 className="text-xl font-bold text-navy mb-3">Support</h3>
            <p className="text-slate">Round-the-clock customer assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMissionSection() {
  return (
    <section id="vision-mission" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black text-navy mb-6">Our Vision</h2>
            <p className="text-lg text-slate leading-relaxed">
              To be India's most trusted and innovative real estate platform, making property 
              transactions transparent, efficient, and accessible for every Indian family.
            </p>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black text-navy mb-6">Our Mission</h2>
            <p className="text-lg text-slate leading-relaxed">
              Empowering Indians to make informed real estate decisions through expert guidance, 
              cutting-edge technology, and unmatched customer service across all major cities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <OurWorkSection />
      <WhyChooseUsSection />
      <VisionMissionSection />
      <PropertiesSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
      
      {/* Professional Floating Action Button */}
      <FloatingActionButton 
        onAIAssistantClick={() => setIsAIAssistantOpen(true)} 
      />
      
      {/* AI Assistant Widget */}
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
    </main>
  );
}