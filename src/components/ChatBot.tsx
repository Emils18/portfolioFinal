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
    // ... same logic as before (unchanged)
  };

  const dismissSuggestions = () => setShowSuggestions(false);
  const showSuggestionChips = () => setShowSuggestions(true);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group flex flex-col items-center gap-1"
        aria-label="Open AI assistant"
      >
        {/* Orb */}
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
        {/* Permanent label */}
        <span className="text-[10px] sm:text-xs font-medium text-white/50 select-none">
          Ask AI
        </span>
      </motion.button>

      {/* Chat window – unchanged */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-20 right-6 z-50 w-80 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* ... rest of chat UI ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}