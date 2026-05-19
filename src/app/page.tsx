"use client";

import { Navbar } from "@/components/layouts/clean-navbar";
import { Footer } from "@/components/layouts/footer";
import { Hero } from "@/features/landing/hero";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { AIChatbot } from "@/components/ui/ai-chatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
      <WhatsAppButton />
      <AIChatbot />
    </main>
  );
}
