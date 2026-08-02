"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";

const STARTER_QUESTIONS = [
  "What's Chitrarth's experience with React Native?",
  "What projects has he built for Reliance?",
  "What tech stack does he specialize in?",
  "Is he open to new opportunities?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Chitrarth's AI assistant 👋 Ask me anything about his experience, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: / opens chat
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !open && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6), // last 6 messages for context
        }),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. You can reach Chitrarth directly at chitrarthrai10@gmail.com or on LinkedIn!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ delay: open ? 0 : 2, type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: open ? 0 : 1.08 }}
        whileTap={{ scale: open ? 0 : 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[6000] flex items-center gap-2 sm:gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-2xl cursor-pointer"
        style={{
          background: "linear-gradient(135deg, rgba(203,172,249,0.25) 0%, rgba(96,165,250,0.2) 100%)",
          border: "1px solid rgba(203,172,249,0.35)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(203,172,249,0.2)",
          pointerEvents: open ? "none" : "auto",
        }}
        aria-label="Ask Chitrarth AI"
        aria-hidden={open}
        tabIndex={open ? -1 : 0}
      >
        <FaRobot size={16} color="#cbacf9" />
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#cbacf9",
          }}
        >
          Ask Chitrarth AI
        </span>
        <span
          className="hidden sm:inline-block"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "9px",
            color: "rgba(255,255,255,0.35)",
            background: "rgba(255,255,255,0.06)",
            padding: "2px 5px",
            borderRadius: "4px",
          }}
        >
          /
        </span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed z-[6000] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              /* Mobile: full-width centered, above bottom nav */
              bottom: "80px",
              left: "12px",
              right: "12px",
              /* Desktop: anchored to bottom-right */
              width: "min(380px, calc(100vw - 24px))",
              height: "min(520px, calc(100vh - 100px))",
              background: "linear-gradient(180deg, #0d1028 0%, #060918 100%)",
              border: "1px solid rgba(203,172,249,0.25)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(203,172,249,0.15)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(203,172,249,0.15)", border: "1px solid rgba(203,172,249,0.25)" }}
                >
                  <FaRobot size={12} color="#cbacf9" />
                </div>
                <div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 700, color: "#FFFFFF" }}>
                    Chitrarth AI
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#34D399" }}>
                    ● Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes size={13} color="rgba(255,255,255,0.5)" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-3 py-2.5 rounded-2xl"
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #cbacf9 0%, #9b7fd4 100%)",
                            borderRadius: "18px 18px 4px 18px",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "18px 18px 18px 4px",
                          }
                    }
                  >
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: msg.role === "user" ? "#0b1229" : "rgba(255,255,255,0.85)",
                        fontWeight: msg.role === "user" ? 600 : 400,
                        margin: 0,
                      }}
                    >
                      {msg.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "18px 18px 18px 4px",
                    }}
                  >
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "rgba(203,172,249,0.6)" }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      color: "rgba(203,172,249,0.8)",
                      background: "rgba(203,172,249,0.08)",
                      border: "1px solid rgba(203,172,249,0.15)",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-3 py-3 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask anything about Chitrarth..."
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.85)",
                  }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="p-1.5 rounded-lg transition-all hover:scale-105 disabled:opacity-30"
                  style={{
                    background: input.trim() ? "rgba(203,172,249,0.2)" : "transparent",
                    border: "1px solid rgba(203,172,249,0.2)",
                  }}
                  aria-label="Send message"
                >
                  <FaPaperPlane size={12} color="#cbacf9" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
