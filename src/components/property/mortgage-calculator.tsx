"use client";

import { useState, useEffect } from "react";
import { DollarSign, Percent, Calendar } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";

export function MortgageCalculator({ price = 1000000 }: { price?: number }) {
  const [loanAmount, setLoanAmount] = useState(price * 0.8);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    setMonthlyPayment(payment || 0);
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <GlassCard className="p-8" hoverEffect={false}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-emerald" />
        Mortgage Calculator
      </h3>

      <div className="space-y-6">
        {/* Loan Amount */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-muted-foreground uppercase">Loan Amount</label>
            <span className="text-sm font-bold">${loanAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={price}
            step={10000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald"
          />
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-muted-foreground uppercase">Interest Rate (%)</label>
            <span className="text-sm font-bold">{interestRate}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-muted-foreground uppercase">Loan Term (Years)</label>
            <span className="text-sm font-bold">{loanTerm} Years</span>
          </div>
          <div className="flex gap-2">
            {[15, 20, 30].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={cn(
                  "flex-1 py-2 rounded-xl text-xs font-bold transition-all",
                  loanTerm === term ? "bg-emerald text-white" : "bg-slate-100 dark:bg-white/5 hover:bg-slate-200"
                )}
              >
                {term} Yrs
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="mt-8 p-6 rounded-2xl bg-emerald/10 border border-emerald/20 text-center">
          <p className="text-xs font-bold text-emerald uppercase mb-1">Estimated Monthly Payment</p>
          <p className="text-3xl font-bold text-emerald">
            ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>

        <AnimatedButton variant="outline" className="w-full rounded-xl">
          Get Pre-Approved
        </AnimatedButton>
      </div>
    </GlassCard>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
