import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, Linkedin } from "lucide-react";
import PreviewFeaturedProjects from "@/components/preview-featured-project";
import { defaultDescription, pageMetadata } from "@/lib/seo";
import { getPublicSocialMedia } from "@/lib/data/public";
import { CV_URL, findSocial, hasCv } from "@/lib/profile";

export const metadata = pageMetadata(
  "Développeur web full stack — en recherche de CDI",
  defaultDescription,
  "/",
);

// Rendu à la demande (la base n'est pas joignable pendant le build Docker) ;
// les données viennent du cache (lib/data/public.ts).
export const dynamic = "force-dynamic";

const strengths = [
  {
    label: "01 — Front-end",
    title: "Des interfaces soignées",
    description:
      "React, Next.js, Tailwind, shadcn/ui, TanStack. Sept ans de graphisme derrière chaque écran.",
  },
  {
    label: "02 — Back-end",
    title: "Des API solides",
    description:
      "NestJS, Prisma, PostgreSQL, MongoDB, Strapi. Expérience sur trois SaaS en entreprise.",
  },
  {
    label: "03 — Déploiement",
    title: "Jusqu'à la prod",
    description:
      "Docker, GitHub Actions, VPS Linux, Vercel. Ce portfolio tourne sur mon propre VPS.",
  },
];

export default async function HomePage() {
  const socials = await getPublicSocialMedia();
  const linkedin = findSocial(socials, "linkedin");
  const cvAvailable = hasCv();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-4 pb-24 pt-10 md:px-6 md:pt-16 lg:flex-row lg:gap-20">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2.5 rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            En recherche d&apos;un CDI · Paris ou remote
          </span>
          <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[84px]">
            Développeur
            <br />
            full stack
            <br />
            <span className="text-primary">qui pense produit.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Graphiste devenu développeur, je construis des applications web de
            bout en bout : interface, API et base de données, en TypeScript.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-14 items-center gap-2 rounded-2xl bg-foreground px-6 font-semibold text-background transition-opacity hover:opacity-90"
            >
              Voir mes projets
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
            {cvAvailable ? (
              <a
                href={CV_URL}
                download
                className="inline-flex h-14 items-center gap-2 rounded-2xl border bg-card px-6 font-semibold transition-colors hover:bg-accent"
              >
                <Download className="h-[18px] w-[18px]" />
                Télécharger le CV
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex h-14 items-center rounded-2xl border bg-card px-6 font-semibold transition-colors hover:bg-accent"
              >
                Me contacter
              </Link>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mon profil LinkedIn"
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border bg-card transition-colors hover:bg-accent"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Photo */}
        <div className="relative w-full max-w-[440px] shrink-0 pb-6 pr-6">
          <div className="absolute inset-0 left-6 top-6 rounded-[32px] bg-primary" />
          <div className="relative aspect-square overflow-hidden rounded-[32px] border-[6px] border-card">
            <Image
              src="/laurent-vuillaume.jpg"
              alt="Portrait de Laurent Vuillaume"
              fill
              priority
              sizes="440px"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-4 bottom-14 flex flex-col gap-0.5 rounded-2xl bg-card px-5 py-3.5 shadow-[0_12px_32px_rgba(14,21,37,0.14)] sm:-left-5">
            <span className="font-display text-3xl font-extrabold">
              Depuis 2007
            </span>
            <span className="text-sm text-muted-foreground">
              dans le web, du graphisme au full stack
            </span>
          </div>
          <span className="absolute -right-1 top-7 rounded-full bg-foreground px-4 py-2.5 font-mono text-[13px] text-background">
            Next.js · NestJS · TS
          </span>
        </div>
      </section>

      {/* Ce que j'apporte */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-24 md:px-6">
        <h2 className="mb-7 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Ce que j&apos;apporte à une équipe
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {strengths.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-3 rounded-3xl border bg-card p-7"
            >
              <span className="font-mono text-[13px] text-primary">
                {item.label}
              </span>
              <h3 className="font-display text-2xl font-bold">{item.title}</h3>
              <p className="leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projets */}
      <PreviewFeaturedProjects />

      {/* Contact */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[32px] bg-[#0e1525] p-8 text-white md:flex-row md:items-center md:p-16 dark:border dark:bg-card">
          <div className="flex items-center gap-5">
            <Image
              src="/laurent-vuillaume.jpg"
              alt=""
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-full border-[3px] border-primary object-cover"
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-3xl font-extrabold leading-tight md:text-[44px]">
                Votre équipe recrute ?
                <br />
                Échangeons.
              </h2>
              <p className="text-[#c4cbd8]">
                Ouvert à un CDI à Paris ou en remote.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-14 shrink-0 items-center gap-2 rounded-2xl bg-white px-7 font-semibold text-[#0e1525] transition-opacity hover:opacity-90"
            >
              Me contacter
              <ArrowRight className="h-4 w-4" />
            </Link>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 shrink-0 items-center gap-2 rounded-2xl border border-white/30 px-6 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
