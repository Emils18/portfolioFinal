export interface Project {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github: string;
  image?: boolean;
}

export const mainProjects: Project[] = [
  {
    title: "Study Load Sorter AI",
    description:
      "Automatically sorts study loads from UCLM files, uses Firebase for ranking.",
    tech: ["React", "Firebase", "CSS"],
    live: "https://emils18.github.io/Sched/",
    github: "https://github.com/Emils18",
  },
  {
    title: "Notetaker AI",
    description:
      "AI‑powered note‑taking website – paste text, choose design, save as image.",
    tech: ["Next.js", "AI APIs"],
    live: "https://notetaker-ai-xsgu.vercel.app/",
    github: "https://github.com/Emils18/notetaker-ai",
  },
  {
    title: "Tekton Thriskevma Corp.",
    description:
      "Premium construction website showcasing services, projects, AI chat, client portal, and lead management.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "AI Chat"],
    live: "https://tekton-thriskevma.vercel.app/",
    github: "https://github.com/Emils18/tekton-thriskevma", // update if different
  },
];

export const otherProjects: Project[] = [
  {
    title: "Mobile Attendance",
    description: "Cross‑platform attendance app with geolocation and biometrics.",
    tech: ["Flutter"],
    github: "https://github.com/Emils18",
    image: true,
  },
];