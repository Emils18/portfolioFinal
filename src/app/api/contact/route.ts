import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 1. Save to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  const { error: dbError } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // 2. Send email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const { error: emailError } = await resend.emails.send({
      from: "Mondares Portfolio <onboarding@resend.dev>",
      to: "emeliomondares14@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <h2>📬 New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json(
        { error: "Email failed: " + emailError.message },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Resend exception:", err);
    return NextResponse.json(
      { error: "Email failed: " + err.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}