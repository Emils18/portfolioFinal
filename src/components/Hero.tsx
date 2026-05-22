"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const skills = ["React", "Next.js", "TypeScript", "Firebase", "AI APIs"];

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      <a href={href} className={className}>
        {children}
      </a>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="section-padding flex min-h-[90vh] items-center">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-indigo-400/80">
            Cebu, Philippines
          </p>
          <h1 className="text-6xl font-extrabold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            Emelio Mondares
            <span className="block text-3xl font-light text-white/30 sm:text-4xl md:text-5xl">
              Web Developer
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/50 sm:text-lg">
            I craft performant, accessible web experiences with modern tools.
            <br />
            Available for part‑time remote roles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-white/40">Tech:</span>
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton href="#projects">
            <span className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-400">
              <span className="relative z-10">View Projects</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 -z-10 bg-indigo-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            </span>
          </MagneticButton>
          <MagneticButton href="https://github.com/Emils18">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition-all hover:border-white/40 hover:text-white">
              GitHub
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}