"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { mainProjects, otherProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

const allProjects = [...mainProjects, ...otherProjects];

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
    if (filter === "backend") return techs.some((t: string) => ["asp.net", "c#", "sql server", "firebase", "supabase"].includes(t));
    if (filter === "mobile") return techs.some((t: string) => ["flutter"].includes(t));
    return false;
  });
}

// ─── Image Gallery (horizontal scroll, all images visible) ───
function ImageGallery({
  images,
  onExpand,
}: {
  images: string[];
  onExpand: (index: number) => void;
}) {
  return (
    <div className="mb-5 overflow-hidden rounded-xl">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-1">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 w-32 h-20 sm:w-40 sm:h-24 rounded-lg overflow-hidden border border-white/5 cursor-pointer hover:border-indigo-400/50 transition-colors"
            onClick={() => onExpand(idx)}
          >
            <img
              src={src}
              alt={`Screenshot ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Full‑screen Lightbox ───
function Lightbox({
  images,
  current,
  onClose,
  onChange,
}: {
  images: string[];
  current: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((current - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl"
      >
        ‹
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((current + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-3xl"
      >
        ›
      </button>

      <motion.img
        key={current}
        src={images[current]}
        alt={`Screenshot ${current + 1}`}
        className="max-w-full max-h-[90vh] object-contain rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              onChange(i);
            }}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === current ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Project Card ───
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/20 hover:bg-white/[0.05]"
      >
        <div className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-indigo-500/0 opacity-0 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:opacity-100" />

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <ImageGallery images={project.images} onExpand={openLightbox} />
        )}

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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && project.images && (
          <Lightbox
            images={project.images}
            current={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onChange={(idx) => setLightboxIndex(idx)}
          />
        )}
      </AnimatePresence>
    </>
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