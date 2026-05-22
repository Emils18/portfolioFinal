import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emelio Mondares | Web Developer – Cebu, Philippines",
  description:
    "Premium portfolio of Emelio Mondares, a web developer crafting modern, performant apps. Available for remote part‑time work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Emelio Mondares",
    jobTitle: "Web Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu",
      addressCountry: "PH",
    },
    url: "https://mondares.dev", // update to actual domain
    sameAs: ["https://github.com/Emils18"],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Firebase",
      "Tailwind CSS",
      "Framer Motion",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}