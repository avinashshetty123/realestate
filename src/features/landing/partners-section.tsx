"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PARTNERS = [
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/f1/Google_logo_2015.svg/2560px-Google_logo_2015.svg.png" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png" },
];

export function PartnersSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-16 bg-slate-50 dark:bg-card/30 overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Trusted by Leading Organizations
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div ref={trackRef} className="flex gap-16 items-center" style={{ width: "max-content" }}>
          {doubled.map((p, i) => (
            <img
              key={i}
              src={p.logo}
              alt={p.name}
              className="h-8 object-contain opacity-30 grayscale hover:opacity-60 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
