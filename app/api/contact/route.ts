import { Resend } from "resend";
import { NextResponse } from "next/server";
import ContactEmail from "@/components/email/template-mail";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  try {
    // Avoid direct usage of the Node `process` identifier which may not be
    // available in this TypeScript configuration. Use globalThis to access
    // runtime environment variables without requiring @types/node.
    const apiKey = (globalThis as any).process?.env?.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Configuration Resend manquante" },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "figura.graphik@gmail.com",
      subject: `📩 Nouveau message de ${name}`,
      replyTo: email,
      react: ContactEmail({
        name,
        from: email,
        message,
        to: "figura.graphik@gmail.com",
        subject: `📩 Nouveau message de ${name}`,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 },
    );
  }
}
