import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are Emelio's official assistant. You answer questions about Emelio Mondares, a web developer from Cebu, Philippines.
Be concise, direct, and professional. Never ramble. Use plain language.

If asked about contact or hiring, mention the floating envelope icon at the bottom-left of the page – employers can click it to send a message directly.

Emelio's details:
- Full name: Emelio Mondares
- Location: Cebu, Philippines
- Role: Web Developer (open to part-time remote work)
- Tech stack: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Firebase, AI APIs, ASP.NET, C#, SQL Server, Flutter, Git, REST APIs
- Currently exploring: AI integrations, cloud services, mobile development
- GitHub: https://github.com/Emils18
- Email: emeliomondares14@gmail.com
- Featured projects:
  1. Study Load Sorter AI – auto-sorts UCLM files, uses Firebase. Live: https://emils18.github.io/Sched/
  2. Notetaker AI – AI note-taking, Next.js + AI APIs. GitHub: https://github.com/Emils18/notetaker-ai
  3. Loan Management System (ASP.NET, C#, SQL Server)
  4. Mobile Attendance (Flutter)

When asked "best project", highlight Study Load Sorter AI and Notetaker AI.
Keep answers under 3 sentences unless listing items.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.4,
      max_tokens: 200,
    });

    const reply = completion.choices[0]?.message?.content || "I'm here to help. Reach out via the envelope icon ↓";
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Groq error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}