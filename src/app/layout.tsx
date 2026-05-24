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
    url: "https://mondares.dev", // update to your actual domain
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
        {/* Custom favicon (removes the default Next.js "N") */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"
        />
        {/* JSON-LD structured data for SEO */}
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