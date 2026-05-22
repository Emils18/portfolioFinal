export interface Project {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github: string;
  featured: boolean;
}

export const mainProjects: Project[] = [
  {
    title: "Study Load Sorter AI",
    description:
      "Automatically sorts study loads from UCLM files, uses Firebase for ranking.",
    tech: ["React", "Firebase", "CSS"],
    live: "https://emils18.github.io/Sched/",
    github: "https://github.com/Emils18",
    featured: true,
  },
  {
    title: "Notetaker AI",
    description:
      "AI‑powered note‑taking website – paste text, choose design, save as image.",
    tech: ["Next.js", "AI APIs"],
    github: "https://github.com/Emils18",
    featured: true,
  },
];

export const secondaryProjects: Project[] = [
  {
    title: "Loan Management System",
    description: "Internal loan tracking system.",
    tech: ["ASP.NET", "C#", "SQL Server"],
    github: "https://github.com/Emils18",
    featured: false,
  },
  {
    title: "Mobile Attendance",
    description: "Cross‑platform attendance app.",
    tech: ["Flutter"],
    github: "https://github.com/Emils18",
    featured: false,
  },
];