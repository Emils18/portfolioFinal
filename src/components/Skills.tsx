"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SkillItem {
  name: string;
  level: number;
}

const skillSets: { category: string; items: SkillItem[] }[] = [
  {
    category: "Frontend Core",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    category: "Backend & Platform",
    items: [
      { name: "Firebase", level: 80 },
      { name: "ASP.NET / C#", level: 75 },
      { name: "SQL Server", level: 70 },
      { name: "AI Web Integrations", level: 75 },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding max-w-6xl mx-auto px-6 border-t border-white/5 scroll-mt-20">
      <div className="mb-16">
        <h2 className="text-sm font-mono text-indigo-400 tracking-widest uppercase mb-3">
          Expertise
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Tools & Capabilities
        </h3>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {skillSets.map((set) => (
          <motion.div
            key={set.category}
            variants={cardVariants}
            className="p-8 rounded-2xl bg-card-bg border border-white/5 hover:border-white/10 hover:bg-neutral-900/50 transition-all duration-300"
          >
            <h4 className="text-lg font-bold mb-6 tracking-tight text-white">
              {set.category}
            </h4>
            <div className="space-y-6">
              {set.items.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-neutral-300">{skill.name}</span>
                    <span className="text-indigo-400 font-mono text-xs">{skill.level}%</span>
                  </div>
                  {/* Track line */}
                  <div className="h-2 w-full bg-neutral-900 border border-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}