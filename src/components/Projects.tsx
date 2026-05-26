"use client";

import { motion } from "framer-motion";
import { mainProjects, otherProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/20 hover:bg-white/[0.05]"
    >
      {/* Hover glow effect */}
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-indigo-500/0 opacity-0 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:opacity-100" />

      {/* Card content */}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          <span className="mt-1 text-xs text-white/20">✦</span>
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
      </div>

      {/* Action buttons – always at the bottom, evenly spaced */}
      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all hover:bg-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:-translate-y-0.5"
          >
            <span>Live Demo</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        ) : (
          <span className="rounded-lg bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/30">
            No demo
          </span>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          <span>GitHub</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold sm:text-3xl"
        >
          Featured Web Apps
        </motion.h2>

        <motion.div className="mt-10 grid gap-6 md:grid-cols-2">
          {mainProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>

        {otherProjects.length > 0 && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 text-2xl font-bold sm:text-3xl"
            >
              Other Projects
            </motion.h2>
            <p className="mt-2 text-sm text-white/40">
              Code‑only repositories – no live demo.
            </p>
            <motion.div className="mt-10 grid gap-6 md:grid-cols-2">
              {otherProjects.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}