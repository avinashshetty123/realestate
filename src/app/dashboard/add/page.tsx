"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ImagePlus, MapPin, Home, DollarSign, CheckCircle2 } from "lucide-react";

export default function AddPropertyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    type: "Villa",
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <DashboardLayout role="agent">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold font-heading">List New <span className="text-emerald">Property</span></h1>
          <p className="text-muted-foreground mt-2">Complete the details to showcase your property to millions.</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all",
                step >= s ? "bg-emerald text-white" : "bg-slate-200 dark:bg-white/5 text-muted-foreground"
              )}>
                {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
              </div>
              {s < 3 && <div className={cn("h-1 w-20 rounded", step > s ? "bg-emerald" : "bg-slate-200 dark:bg-white/5")} />}
            </div>
          ))}
        </div>

        <GlassCard className="p-10" hoverEffect={false}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Property Title</label>
                   <input 
                    type="text" 
                    placeholder="e.g. Modern Sunset Villa" 
                    className="w-full rounded-xl bg-slate-100 dark:bg-white/5 p-4 focus:outline-none" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Property Type</label>
                   <select 
                    className="w-full rounded-xl bg-slate-100 dark:bg-white/5 p-4 focus:outline-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                   >
                     <option>Villa</option>
                     <option>Penthouse</option>
                     <option>Condo</option>
                     <option>Office</option>
                   </select>
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                 <textarea 
                  rows={6} 
                  placeholder="Describe the property's unique features..." 
                  className="w-full rounded-xl bg-slate-100 dark:bg-white/5 p-4 focus:outline-none" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                 />
               </div>

               <AnimatedButton onClick={nextStep} className="w-full py-6 rounded-xl bg-emerald text-white text-lg font-bold">
                 Continue to Location
               </AnimatedButton>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Address / Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald" />
                      <input 
                        type="text" 
                        placeholder="123 Beverly Hills Drive, CA" 
                        className="w-full rounded-xl bg-slate-100 dark:bg-white/5 p-4 pl-12 focus:outline-none" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald" />
                      <input 
                        type="text" 
                        placeholder="12,500,000" 
                        className="w-full rounded-xl bg-slate-100 dark:bg-white/5 p-4 pl-12 focus:outline-none" 
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </div>
               </div>

               <div className="flex gap-4">
                 <AnimatedButton variant="outline" onClick={prevStep} className="flex-1 py-6 rounded-xl">Back</AnimatedButton>
                 <AnimatedButton onClick={nextStep} className="flex-[2] py-6 rounded-xl bg-emerald text-white text-lg font-bold">
                   Continue to Media
                 </AnimatedButton>
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center">
               <div className="border-2 border-dashed border-emerald/20 rounded-3xl p-16 bg-emerald/5 transition-colors hover:bg-emerald/10 cursor-pointer">
                  <ImagePlus className="mx-auto h-16 w-16 text-emerald mb-4 opacity-50" />
                  <h4 className="text-xl font-bold">Upload Property Media</h4>
                  <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                    Drag and drop your high-resolution images and videos here, or click to browse.
                  </p>
                  <button className="mt-8 px-8 py-3 bg-emerald text-white rounded-full font-bold shadow-lg shadow-emerald/20">
                    Browse Files
                  </button>
               </div>

               <div className="flex gap-4">
                 <AnimatedButton variant="outline" onClick={prevStep} className="flex-1 py-6 rounded-xl">Back</AnimatedButton>
                 <AnimatedButton className="flex-[2] py-6 rounded-xl bg-matte-black text-white text-lg font-bold">
                   Publish Listing
                 </AnimatedButton>
               </div>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
