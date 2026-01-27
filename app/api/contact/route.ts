import { Resend } from "resend";
import { NextResponse } from "next/server";
import ContactEmail from "@/email/contact-email";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "figura.graphik@gmail.com",
      subject: `📩 Nouveau message de ${name}`,
      replyTo: email,
      react: ContactEmail({ name, email, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
