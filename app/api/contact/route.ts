import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";
import ContactEmail from "@/components/email/template-mail";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const TO_EMAIL = "figura.graphik@gmail.com";

const MINUTE = 60 * 1000;
// Par visiteur : 3 messages par tranche de 15 minutes, 10 par jour.
const PER_IP_SHORT = { limit: 3, windowMs: 15 * MINUTE };
const PER_IP_DAY = { limit: 10, windowMs: 24 * 60 * MINUTE };
// Tous visiteurs confondus : plafond qui protège ton quota Resend même si
// un robot change d'adresse IP à chaque envoi.
const GLOBAL_HOUR = { limit: 30, windowMs: 60 * MINUTE };

// Un humain met plus de 3 secondes à remplir le formulaire.
const MIN_FILL_TIME_MS = 3000;

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  // Champ piège invisible : un humain le laisse vide, un robot le remplit.
  website: z.string().optional().default(""),
  // Horodatage d'affichage du formulaire (ms), envoyé par le client.
  startedAt: z.number().optional(),
});

function tooMany(retryAfterSec: number) {
  return NextResponse.json(
    {
      error:
        "Trop de messages envoyés. Merci de réessayer un peu plus tard ou de m'écrire directement par e-mail.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } },
  );
}

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Champs manquants ou invalides" },
      { status: 400 },
    );
  }
  const { name, email, subject, message, website, startedAt } = parsed.data;

  // Robot détecté : on répond « succès » sans rien envoyer, pour ne pas lui
  // indiquer qu'il a été repéré.
  const filledTooFast =
    typeof startedAt === "number" && Date.now() - startedAt < MIN_FILL_TIME_MS;
  if (website || filledTooFast) {
    return NextResponse.json({ success: true });
  }

  const ip = getClientIp(req);
  for (const [key, rule] of [
    [`contact:short:${ip}`, PER_IP_SHORT],
    [`contact:day:${ip}`, PER_IP_DAY],
    ["contact:global", GLOBAL_HOUR],
  ] as const) {
    const result = rateLimit(key, rule.limit, rule.windowMs);
    if (!result.ok) return tooMany(result.retryAfterSec);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Configuration Resend manquante" },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: subject
        ? `📩 ${subject} — ${name}`
        : `📩 Nouveau message de ${name}`,
      replyTo: email,
      react: ContactEmail({
        name,
        from: email,
        message,
        to: TO_EMAIL,
        subject: subject || `Nouveau message de ${name}`,
      }),
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 },
    );
  }
}
