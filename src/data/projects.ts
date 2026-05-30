export interface Project {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github: string;
  images?: string[];
}

export const mainProjects: Project[] = [
  {
    title: "Study Load Sorter AI",
    description:
      "Automatically sorts study loads from UCLM files, uses Firebase for ranking.",
    tech: ["React", "Firebase", "CSS"],
    live: "https://emils18.github.io/Sched/",
    github: "https://github.com/Emils18",
    images: [
      "/projects/study-load-sorter/5.jpg",
      "/projects/study-load-sorter/11.jpg",
      "/projects/study-load-sorter/12.jpg",
      "/projects/study-load-sorter/19.jpg",
    ],
  },
  {
    title: "Notetaker AI",
    description:
      "AI‑powered note‑taking website – paste text, choose design, save as image.",
    tech: ["Next.js", "AI APIs"],
    live: "https://notetaker-ai-xsgu.vercel.app/",
    github: "https://github.com/Emils18/notetaker-ai",
    images: [
      "/projects/notetaker-ai/2.jpg",
      "/projects/notetaker-ai/3.jpg",
      "/projects/notetaker-ai/6.jpg",
      "/projects/notetaker-ai/8.jpg",
      "/projects/notetaker-ai/14.jpg",
      "/projects/notetaker-ai/17.jpg",
      "/projects/notetaker-ai/18.jpg",
    ],
  },
  {
    title: "Tekton Thriskevma Corp.",
    description:
      "Premium construction website showcasing services, projects, AI chat, client portal, and lead management.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "AI Chat"],
    live: "https://tekton-thriskevma.vercel.app/",
    github: "https://github.com/Emils18/tekton-thriskevma",
    images: [
      "/projects/tekton/1.jpg",
      "/projects/tekton/4.jpg",
      "/projects/tekton/7.jpg",
      "/projects/tekton/9.jpg",
      "/projects/tekton/13.jpg",
      "/projects/tekton/15.jpg",
      "/projects/tekton/16.jpg",
      "/projects/tekton/20.jpg",
    ],
  },
];

export const otherProjects: Project[] = [
  {
    title: "Mobile Attendance",
    description: "Cross‑platform attendance app with geolocation and biometrics.",
    tech: ["Flutter"],
    github: "https://github.com/Emils18",
    // No images yet – the mobile‑attendance folder is empty
    // When you add screenshots, uncomment the array below:
    // images: [
    //   "/projects/mobile-attendance/1.jpg",
    //   "/projects/mobile-attendance/2.jpg",
    // ],
  },
];