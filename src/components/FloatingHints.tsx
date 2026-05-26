"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingHints() {
  const [showEnvelopeHint, setShowEnvelopeHint] = useState(false);
  const [showChatHint, setShowChatHint] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("hintsShown")) return;
    sessionStorage.setItem("hintsShown", "true");

    const envelopeTimer = setTimeout(() => setShowEnvelopeHint(true), 3000);
    const chatTimer = setTimeout(() => setShowChatHint(true), 4000);
    const hideEnvelopeTimer = setTimeout(() => setShowEnvelopeHint(false), 7000);
    const hideChatTimer = setTimeout(() => setShowChatHint(false), 8000);

    return () => {
      clearTimeout(envelopeTimer);
      clearTimeout(chatTimer);
      clearTimeout(hideEnvelopeTimer);
      clearTimeout(hideChatTimer);
    };
  }, []);

  return (
    <>
      {/* Envelope hint */}
      <AnimatePresence>
        {showEnvelopeHint && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-[88px] left-[88px] z-50 pointer-events-none"
          >
            <div className="relative flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
              <span className="text-xs text-white/60 font-medium tracking-wide">
                Message me
              </span>
              {/* Subtle line pointing to the button */}
              <svg
                className="absolute -bottom-2 left-3 w-4 h-4 text-white/20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 16l-6-6h12z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot hint */}
      <AnimatePresence>
        {showChatHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-[88px] right-[88px] z-50 pointer-events-none"
          >
            <div className="relative flex items-center gap-2 flex-row-reverse">
              <div className="w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse" />
              <span className="text-xs text-white/60 font-medium tracking-wide">
                Ask AI
              </span>
              <svg
                className="absolute -bottom-2 right-3 w-4 h-4 text-white/20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 16l-6-6h12z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}