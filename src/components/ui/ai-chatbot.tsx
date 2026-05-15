"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, Loader2, AlertCircle, RotateCcw, MessageSquare, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
  time: string;
}

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How do I buy a property?",
  "What areas do you cover?",
  "How can I list my property?",
];

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"info" | "chat">("info");
  const [userInfo, setUserInfo] = useState({ name: "", phone: "" });
  const [infoError, setInfoError] = useState("");
  const [sessionId, setSessionId] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm PropVista's AI assistant.\n\nI can help you with property searches, buying/selling advice, our services, and anything real estate related. What can I help you with today?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ blocked: boolean; resetIn?: number }>({ blocked: false });
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const startChat = async () => {
    if (!userInfo.name.trim() || !userInfo.phone.trim()) {
      setInfoError("Please enter your name and phone number to continue.");
      return;
    }
    setInfoError("");
    
    // Use phone number as session identifier
    const phoneSessionId = `phone_${userInfo.phone.replace(/[^0-9]/g, "")}`;
    setSessionId(phoneSessionId);
    
    // Check if session exists and load previous messages
    try {
      const res = await fetch(`/api/chat-sessions?phone=${userInfo.phone.replace(/[^0-9]/g, "")}`);
      if (res.ok) {
        const data = await res.json();
        if (data.session && data.session.messages && data.session.messages.length > 0) {
          // Load existing messages
          const loadedMessages = data.session.messages.map((m: any) => ({
            role: m.role,
            content: m.content,
            time: new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }));
          setMessages(loadedMessages);
        }
      }
    } catch (error) {
      console.error("Failed to load previous messages:", error);
    }
    
    setStep("chat");
    
    // Save/update session in DB
    fetch("/api/chat-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: phoneSessionId, name: userInfo.name, phone: userInfo.phone, type: "session_start" }),
    }).catch(() => {});
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    setInput("");
    const userMsg: Message = { role: "user", content, time: getTime() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    // Save user query to DB
    fetch("/api/chat-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        name: userInfo.name,
        phone: userInfo.phone,
        type: "message",
        role: "user",
        content,
      }),
    }).catch(() => {});

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
          { role: "assistant", content: `You've sent too many messages. Please wait ${resetIn} seconds.`, error: true, time: getTime() },
        ]);
        setTimeout(() => setRateLimitInfo({ blocked: false }), data.resetIn ?? 60000);
        return;
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const reply = data.reply;
      setMessages((prev) => [...prev, { role: "assistant", content: reply, time: getTime() }]);

      if (!isOpen) setUnread((u) => u + 1);

      // Save assistant reply to DB
      fetch("/api/chat-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name: userInfo.name,
          phone: userInfo.phone,
          type: "message",
          role: "assistant",
          content: reply,
        }),
      }).catch(() => {});
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again.", error: true, time: getTime() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{
      role: "assistant",
      content: "Hi there! 👋 I'm PropVista's AI assistant.\n\nI can help you with property searches, buying/selling advice, our services, and anything real estate related. What can I help you with today?",
      time: getTime(),
    }]);
    setRateLimitInfo({ blocked: false });
    setStep("info");
    setUserInfo({ name: "", phone: "" });
    setSessionId("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-[380px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            style={{ maxHeight: "600px" }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#0f2942] via-[#0f4c5c] to-[#0d7377] p-4 flex items-center justify-between shrink-0">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-8 w-16 h-16 bg-teal/10 rounded-full translate-y-1/2 pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="h-10 w-10 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f2942]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">PropVista AI</p>
                  <p className="text-[11px] text-white/60 flex items-center gap-1 mt-0.5">
                    <Sparkles className="h-2.5 w-2.5 text-teal-300" />
                    Real Estate Expert · Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative z-10">
                <button onClick={resetChat} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors" title="Reset chat">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* User Info Step */}
            {step === "info" && (
              <div className="flex-1 bg-white flex flex-col justify-center p-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-navy text-lg">Before we start</h3>
                  <p className="text-slate text-sm mt-1">Share your details so our team can follow up with you.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">Your Name *</label>
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo((p) => ({ ...p, name: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && startChat()}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">Phone Number *</label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo((p) => ({ ...p, phone: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && startChat()}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    />
                  </div>

                  {infoError && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {infoError}
                    </p>
                  )}

                  <button
                    onClick={startChat}
                    className="w-full bg-gradient-to-r from-teal to-teal-light text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    Start Chat
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[10px] text-slate text-center mt-4">
                  Your info is only used to help our team follow up with you.
                </p>
              </div>
            )}

            {/* Chat Step */}
            {step === "chat" && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50" style={{ minHeight: 0 }}>
                  {/* Welcome banner */}
                  <div className="bg-gradient-to-r from-teal/10 to-blue-500/10 border border-teal/20 rounded-2xl px-4 py-3 text-center">
                    <p className="text-xs text-teal font-semibold">Chatting as <span className="text-navy">{userInfo.name}</span></p>
                    <p className="text-[10px] text-slate mt-0.5">Our team will follow up on your queries</p>
                  </div>

                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col gap-1",
                        msg.role === "user" ? "items-end" : "items-start"
                      )}
                    >
                      {/* Avatar + bubble row */}
                      <div className={cn("flex items-end gap-2 max-w-[88%]", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                        {/* Avatar */}
                        {msg.role === "assistant" && (
                          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal to-blue-500 flex items-center justify-center shrink-0 mb-1">
                            <Bot className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        {msg.role === "user" && (
                          <div className="w-7 h-7 rounded-xl bg-navy flex items-center justify-center shrink-0 mb-1">
                            <span className="text-white text-[10px] font-bold">{userInfo.name.charAt(0).toUpperCase()}</span>
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={cn(
                            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                            msg.role === "user"
                              ? "bg-gradient-to-br from-teal to-teal-light text-white rounded-tr-sm shadow-sm"
                              : msg.error
                              ? "bg-red-50 text-red-600 border border-red-200 rounded-tl-sm"
                              : "bg-white text-gray-800 border border-slate-200 rounded-tl-sm shadow-sm"
                          )}
                        >
                          {msg.error && <AlertCircle className="h-3.5 w-3.5 inline mr-1.5 mb-0.5" />}
                          {msg.content}
                        </div>
                      </div>

                      {/* Time */}
                      <span className={cn("text-[10px] text-slate/60 px-9", msg.role === "user" ? "text-right" : "text-left")}>
                        {msg.time}
                      </span>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex items-end gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-teal to-blue-500 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
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
                  <div className="px-4 py-3 border-t border-slate-100 bg-white shrink-0">
                    <p className="text-[10px] font-bold text-slate uppercase tracking-wider mb-2">Quick Questions</p>
                    <div className="flex flex-wrap gap-1.5">
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
                <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                  {rateLimitInfo.blocked ? (
                    <div className="flex items-center gap-2 text-xs text-slate bg-slate-50 rounded-xl px-4 py-3">
                      <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                      Rate limit reached. Please wait {rateLimitInfo.resetIn}s.
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all disabled:opacity-50"
                      />
                      <button
                        onClick={() => sendMessage()}
                        disabled={isLoading || !input.trim()}
                        className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal to-teal-light text-white flex items-center justify-center hover:shadow-md transition-all disabled:opacity-40 shrink-0"
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </button>
                    </div>
                  )}
                  <p className="text-[10px] text-slate/50 mt-1.5 text-center">
                    Powered by PropVista AI · Real estate queries only
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-teal to-teal-light text-white shadow-xl flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageSquare className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse */}
        {!isOpen && <span className="absolute inset-0 rounded-2xl animate-ping bg-teal/30 pointer-events-none" />}

        {/* Unread badge */}
        {!isOpen && unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </motion.button>
    </div>
  );
}
