"use client";

import { Navbar } from "@/components/layouts/clean-navbar";
import { Footer } from "@/components/layouts/footer";
import { VisionMissionSection } from "@/features/landing/vision-mission";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { AIChatbot } from "@/components/ui/ai-chatbot";

export default function VisionMissionPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 min-h-screen">
        <VisionMissionSection />
      </div>
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </main>
  );
}
