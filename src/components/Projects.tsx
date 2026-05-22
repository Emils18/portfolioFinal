"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { mainProjects, secondaryProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

const allProjects = [...mainProjects, ...secondaryProjects];

const filterOptions = [
  { label: "All", key: "all" },
  { label: "React / Next.js", key: "react" },
  { label: "Backend", key: "backend" },
  { label: "Mobile", key: "mobile" },
];

function filterProjects(filter: string) {
  if (filter === "all") return allProjects;
  return allProjects.filter((p) => {
    const techs: string[] = p.tech.map((t: string) => t.toLowerCase());
    if (filter === "react") return techs.some((t: string) => ["react", "next.js"].includes(t));
    if (filter === "backend") return techs.some((t: string) => ["asp.net", "c#", "sql server", "firebase"].includes(t));
    if (filter === "mobile") return techs.some((t: string) => ["flutter"].includes(t));
    return false;
  });
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-indigo-500/20 hover:bg-white/[0.05]"
    >
      <div className="absolute -inset-1 -z-10 rounded-2xl bg-indigo-500/0 opacity-0 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:opacity-100" />
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="text-xs text-white/30">✦</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/50">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-white/[0.03] px-2 py-1 text-xs font-medium text-white/50"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Live Demo ↗
          </a>
        ) : (
          <span className="text-white/30">Demo on request</span>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-white transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = filterProjects(activeFilter);

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold sm:text-3xl"
        >
          Featured Work
        </motion.h2>

        {/* Filter buttons */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveFilter(opt.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeFilter === opt.key
                  ? "bg-indigo-500 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}