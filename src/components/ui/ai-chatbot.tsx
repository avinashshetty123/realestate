"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How do I buy a property?",
  "What areas do you cover?",
  "How can I list my property?",
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm PropVista's AI assistant 👋\n\nI can help you with property searches, buying/selling advice, our services, and anything real estate related. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ blocked: boolean; resetIn?: number }>({ blocked: false });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    setInput("");
    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 429) {
        const data = await res.json();
        const resetIn = Math.ceil((data.resetIn ?? 60000) / 1000);
        setRateLimitInfo({ blocked: true, resetIn });
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `You've sent too many messages. Please wait ${resetIn} seconds before trying again.`,
            error: true,
          },
        ]);
        setTimeout(() => setRateLimitInfo({ blocked: false }), (data.resetIn ?? 60000));
        return;
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{
      role: "assistant",
      content: "Hi! I'm PropVista's AI assistant 👋\n\nI can help you with property searches, buying/selling advice, our services, and anything real estate related. What can I help you with today?",
    }]);
    setRateLimitInfo({ blocked: false });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[360px] overflow-hidden rounded-2xl shadow-premium border border-border bg-white dark:bg-card"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy to-navy-light p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-teal/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">PropVista AI</p>
                  <p className="text-[10px] text-white/50 flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5 text-teal" />
                    Powered by Grok · Real Estate Expert
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reset chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[380px] overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-background/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col gap-1 max-w-[85%]",
                    msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-teal text-white rounded-tr-sm"
                        : msg.error
                        ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 rounded-tl-sm"
                        : "bg-white dark:bg-card border border-border text-foreground rounded-tl-sm shadow-soft"
                    )}
                  >
                    {msg.error && <AlertCircle className="h-3.5 w-3.5 inline mr-1.5 mb-0.5" />}
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">
                    {msg.role === "user" ? "You" : "PropVista AI"}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="bg-white dark:bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-soft">
                    <div className="flex gap-1.5 items-center">
                      <span className="h-2 w-2 rounded-full bg-teal animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-teal animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-teal animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="px-4 py-3 border-t border-border bg-white dark:bg-card">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Quick Questions</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      onClick={() => sendMessage(p)}
                      className="text-xs px-3 py-1.5 rounded-full bg-teal/10 text-teal border border-teal/20 hover:bg-teal hover:text-white transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-white dark:bg-card">
              {rateLimitInfo.blocked ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-slate-50 dark:bg-white/5 rounded-xl px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                  Rate limit reached. Please wait {rateLimitInfo.resetIn}s.
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                    placeholder="Ask about properties, services..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-50 dark:bg-white/5 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all disabled:opacity-50"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !input.trim()}
                    className="h-10 w-10 rounded-xl bg-teal text-white flex items-center justify-center hover:bg-teal-light transition-colors disabled:opacity-40 shrink-0"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </div>
              )}
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Real estate queries only · 10 messages/min limit
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-teal to-teal-light text-white shadow-premium flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-teal/30" />
        )}
      </motion.button>
    </div>
  );
}
