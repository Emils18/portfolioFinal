"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const predefinedReplies: Record<string, string> = {
  hi: "Hey there! I'm Mondares' virtual assistant. How can I help you?",
  projects:
    "Check out my featured projects: Study Load Sorter AI and Notetaker AI. You can also use the filter above!",
  skills:
    "I work with React, Next.js, TypeScript, Firebase, Framer Motion, and more. Check the Skills section!",
  contact:
    "You can reach me via the contact form at the bottom of the page or email mondares@example.com.",
  default:
    "I'm not sure I understand. Ask me about projects, skills, or contact.",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { text: userMsg, isUser: true }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botReply = getBotReply(userMsg.toLowerCase());
      setMessages((prev) => [...prev, { text: botReply, isUser: false }]);
    }, 600);
  };

  const getBotReply = (msg: string) => {
    if (msg.includes("hi") || msg.includes("hello")) return predefinedReplies.hi;
    if (msg.includes("project")) return predefinedReplies.projects;
    if (msg.includes("skill") || msg.includes("tech")) return predefinedReplies.skills;
    if (msg.includes("contact") || msg.includes("email")) return predefinedReplies.contact;
    return predefinedReplies.default;
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              exit={{ rotate: 0 }}
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl"
          >
            <div className="p-4 border-b border-white/5">
              <h3 className="text-sm font-semibold">Mondares Assistant</h3>
              <p className="text-xs text-white/40">Ask me about projects, skills, or contact</p>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.length === 0 && (
                <p className="text-white/30 text-center text-xs">
                  Say &ldquo;hi&rdquo; to start the conversation.
                </p>
              )}
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
                      className={`max-w-[80%] rounded-xl px-3 py-2 ${
                        msg.isUser
                          ? "bg-indigo-500 text-white"
                          : "bg-white/5 text-white/80"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="rounded-lg bg-indigo-500 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-400"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}