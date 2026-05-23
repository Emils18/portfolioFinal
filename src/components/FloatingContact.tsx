"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

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
      {/* Floating Button – "Hire Me" with bounce + glow */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
      >
        <span className="text-lg">💼</span> Hire Me
      </motion.button>

      {/* Modal – playful and conversational */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            ref={modalRef}
            className="fixed bottom-24 left-6 z-50 w-80 rounded-2xl border border-white/10 bg-[#0f0f0f]/95 backdrop-blur-xl shadow-2xl p-5"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-green-400"
                  >
                    ✈️
                  </motion.div>
                  <p className="font-semibold text-lg">Message sent!</p>
                  <p className="mt-1 text-sm text-white/50">I’ll reply faster than a rocket 🚀</p>
                  <button onClick={closeAndReset} className="mt-4 text-sm text-indigo-400 hover:underline">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <h3 className="mb-1 text-lg font-bold">Let’s work together</h3>
                  <p className="mb-4 text-xs text-white/50">I’m just one message away ✨</p>
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
                      placeholder="Email address"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none"
                    />
                    <textarea
                      rows={3}
                      placeholder="Tell me about your project…"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-indigo-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-2.5 text-sm font-semibold text-white transition-all hover:from-indigo-400 hover:to-purple-400 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {status === "sending" ? (
                        <>Sending <span className="animate-pulse">📨</span></>
                      ) : (
                        <>Send Message ✈️</>
                      )}
                    </button>
                    {status === "error" && (
                      <p className="text-center text-xs text-red-400">Oops! Try again.</p>
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