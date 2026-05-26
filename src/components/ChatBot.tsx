"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  text: string;
  isUser: boolean;
}

interface Suggestion {
  icon: string;
  text: string;
}

const suggestions: Suggestion[] = [
  { icon: "💼", text: "Available for part-time?" },
  { icon: "⚛️", text: "What's your tech stack?" },
  { icon: "🚀", text: "Best project?" },
  { icon: "📅", text: "Experience" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, isLoading, showSuggestions]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setShowSuggestions(false);

    const newMessages: Message[] = [
      ...messages,
      { text: messageText, isUser: true },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.isUser ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      const botReply =
        data.reply ||
        "I'm not sure about that. Reach out via the envelope icon ↓";
      setTimeout(() => {
        setMessages([...newMessages, { text: botReply, isUser: false }]);
        setIsLoading(false);
        setShowSuggestions(true);
      }, 600);
    } catch {
      setMessages([
        ...newMessages,
        { text: "Something went wrong. Please try again later.", isUser: false },
      ]);
      setIsLoading(false);
      setShowSuggestions(true);
    }
  };

  const dismissSuggestions = () => setShowSuggestions(false);
  const showSuggestionChips = () => setShowSuggestions(true);

  return (
    <>
      {/* Floating button with label */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group flex flex-col items-center gap-1"
        aria-label="Open AI assistant"
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full border-2 border-indigo-300/30"
          />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg key="close" initial={{ rotate: 0 }} animate={{ rotate: 90 }} exit={{ rotate: 0 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </motion.svg>
            ) : (
              <motion.svg key="chat" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-white/50 select-none">
          Ask AI
        </span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-20 right-6 z-50 w-80 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Emelio's Assistant
              </h3>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 text-sm">
              {/* Suggestions before any message */}
              {messages.length === 0 && showSuggestions && (
                <div className="flex flex-wrap gap-2 items-center">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleSend(s.text)}
                      className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-white/10 transition"
                    >
                      <span>{s.icon}</span> {s.text}
                    </motion.button>
                  ))}
                  <button
                    onClick={dismissSuggestions}
                    className="text-white/40 hover:text-white text-xs ml-1"
                    title="Hide suggestions"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Suggestions after AI reply */}
              {messages.length > 0 && showSuggestions && !isLoading && (
                <div className="flex flex-wrap gap-2 items-center">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleSend(s.text)}
                      className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 hover:bg-white/10 transition"
                    >
                      <span>{s.icon}</span> {s.text}
                    </motion.button>
                  ))}
                  <button
                    onClick={dismissSuggestions}
                    className="text-white/40 hover:text-white text-xs ml-1"
                    title="Hide suggestions"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Show link to bring back suggestions if hidden */}
              {!showSuggestions && messages.length > 0 && (
                <button
                  onClick={showSuggestionChips}
                  className="text-xs text-white/30 hover:text-white/60 underline"
                >
                  Show suggestions
                </button>
              )}

              {/* Chat bubbles */}
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        msg.isUser
                          ? "bg-indigo-500 text-white rounded-br-md"
                          : "bg-white/5 text-white/80 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 ml-2"
                >
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-white/40">Typing...</span>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 bg-white/[0.02]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 text-xs font-medium text-white hover:from-indigo-400 hover:to-purple-400 disabled:opacity-50 transition-all"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}