"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Listen for custom event from Navbar "Contact" link
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-envelope", handler);
    return () => window.removeEventListener("open-envelope", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const closeAndReset = () => {
    setOpen(false);
    setStatus("idle");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Floating button with label */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 group flex flex-col items-center gap-1"
        aria-label="Open contact form"
      >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-shadow duration-500">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-white/20"
          />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-white/50 select-none">
          Message
        </span>
      </motion.button>

      {/* Contact modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            ref={modalRef}
            className="fixed bottom-24 left-6 z-50 w-80 rounded-2xl border border-white/10 bg-[#0f0f0f]/95 backdrop-blur-2xl shadow-2xl p-5"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-lg font-bold">Message sent</h3>
                  <p className="mt-1 text-sm text-white/50">I'll get back to you shortly.</p>
                  <button onClick={closeAndReset} className="mt-4 text-sm text-indigo-400 hover:underline">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <h3 className="text-lg font-bold mb-2">Contact Emelio</h3>
                  <p className="text-xs text-white/50 mb-4">Fill in your details and message</p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none"
                    />
                    <textarea
                      rows={3}
                      placeholder="Your message"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full rounded-xl bg-indigo-500 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-400 disabled:opacity-50"
                    >
                      {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                    {status === "error" && (
                      <p className="text-center text-xs text-red-400">Failed to send. Please try again.</p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}