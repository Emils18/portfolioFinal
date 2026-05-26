export interface Project {
  title: string;
  description: string;
  tech: string[];
  live?: string;
  github: string;
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
      "AI‑powered note‑taking website – paste text, summerize Using OCR can read image and can make QnA about your content.",
    tech: ["Next.js", "AI APIs"],
    live: "https://notetaker-ai-xsgu.vercel.app/",
    github: "https://github.com/Emils18/notetaker-ai",
  },
];

export const otherProjects: Project[] = [
  {
    title: "Loan Management System",
    description: "Internal loan tracking system.",
    tech: ["ASP.NET", "C#", "SQL Server"],
    github: "https://github.com/Emils18",
  },
  {
    title: "Mobile Attendance",
    description: "Cross‑platform attendance app.",
    tech: ["Flutter"],
    github: "https://github.com/Emils18",
  },
];