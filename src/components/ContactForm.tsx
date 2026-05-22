"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="mt-12 max-w-lg mx-auto space-y-4"
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center"
          >
            <p className="text-lg font-semibold text-green-400">Message sent!</p>
            <p className="mt-2 text-sm text-white/50">I’ll get back to you soon.</p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
              className="mt-4 text-sm text-indigo-400 hover:underline"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0 }} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <textarea
                rows={4}
                placeholder="Your message"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 backdrop-blur-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-400 disabled:opacity-50"
            >
              {status === "sending" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </span>
              ) : (
                "Send Message"
              )}
            </button>
            {status === "error" && (
              <p className="text-center text-sm text-red-400">Something went wrong. Please try again.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}