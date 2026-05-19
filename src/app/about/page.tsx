"use client";

import { Navbar } from "@/components/layouts/clean-navbar";
import { Footer } from "@/components/layouts/footer";
import { AboutSection } from "@/features/landing/about-section";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { AIChatbot } from "@/components/ui/ai-chatbot";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 min-h-screen">
        <AboutSection />
      </div>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </main>
  );
}
