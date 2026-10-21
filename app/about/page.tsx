// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Download, Linkedin } from "lucide-react";
import ItemExperience from "@/components/experience/ItemExperience";
import { getPublicExperiences, getPublicSocialMedia } from "@/lib/data/public";
import { CV_URL, findSocial, hasCv } from "@/lib/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Parcours et compétences de développeur full stack",
  "Mon parcours, du graphisme au développement full stack : expériences en équipe sur des SaaS et compétences en TypeScript, React, Next.js, NestJS et PostgreSQL.",
  "/about",
);

// Rendu à la demande ; les données viennent du cache (lib/data/public.ts).
export const dynamic = "force-dynamic";

const stack = [
  {
    title: "Front-end",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack"],
  },
  {
    title: "Back-end",
    items: ["NestJS", "Node.js", "Prisma", "PostgreSQL", "MongoDB", "Strapi"],
  },
  {
    title: "Déploiement",
    items: ["Docker", "GitHub Actions", "VPS Linux", "Vercel"],
  },
];

export default async function AboutPage() {
  const [experiences, socials] = await Promise.all([
    getPublicExperiences(),
    getPublicSocialMedia(),
  ]);
  const linkedin = findSocial(socials, "linkedin");
  const cvAvailable = hasCv();

  // Les dates sortent du cache sous forme de chaînes ; plus récent en premier.
  const timeline = [...experiences]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )
    .map((exp) => ({
      year: `${new Date(exp.startDate).getFullYear()} – ${
        exp.endDate ? new Date(exp.endDate).getFullYear() : "aujourd'hui"
      }`,
      role: exp.role,
      company: exp.company,
      description: exp.description,
    }));

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-16">
      {/* Intro */}
      <section className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
        <div className="relative w-full max-w-[360px] shrink-0 pb-5 pr-5">
          <div className="absolute inset-0 left-5 top-5 rounded-[28px] bg-primary" />
          <div className="relative aspect-square overflow-hidden rounded-[28px] border-[6px] border-card">
            <Image
              src="/laurent-vuillaume.jpg"
              alt="Portrait de Laurent Vuillaume"
              fill
              priority
              sizes="360px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">
            Du print
            <br />
            <span className="text-primary">au full stack.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            J&apos;ai commencé le web en 2007 comme intégrateur, puis passé sept
            ans comme graphiste indépendant : logos, print, identités visuelles.
            Je suis revenu au code côté front, avant de passer full stack sur
            trois SaaS développés en équipe. J&apos;ai validé ce parcours à la
            Wild Code School avec le titre RNCP de Concepteur Développeur
            d&apos;Applications.
          </p>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Aujourd&apos;hui je travaille en TypeScript, de React et Next.js
            jusqu&apos;à NestJS et PostgreSQL, et je déploie mes projets avec
            Docker sur mon propre VPS. Je cherche un CDI à Paris ou en remote.
          </p>
          <div className="flex flex-wrap gap-3">
            {cvAvailable && (
              <a
                href={CV_URL}
                download
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-foreground px-5 font-semibold text-background transition-opacity hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Télécharger le CV
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-2xl border bg-card px-5 font-semibold transition-colors hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-2xl border bg-card px-5 font-semibold transition-colors hover:bg-accent"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-24 grid gap-16 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Parcours */}
        <section className="flex flex-col gap-8">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Expérience professionnelle
          </h2>
          <div className="flex flex-col gap-8">
            {timeline.map((exp, index) => (
              <ItemExperience key={index} exp={exp} />
            ))}
          </div>
        </section>

        {/* Formation + stack */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-3 rounded-3xl border bg-card p-7">
            <h2 className="font-display text-2xl font-bold">Formation</h2>
            <p className="font-semibold">
              Titre RNCP Concepteur Développeur d&apos;Applications
            </p>
            <p className="text-sm text-muted-foreground">
              Niveau 6 · Wild Code School
            </p>
            <Link
              href="/projects/snow-wild"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Voir le projet de soutenance : Snow Wild →
            </Link>
          </div>
          <div className="flex flex-col gap-7 rounded-3xl border bg-card p-7">
            <h2 className="font-display text-2xl font-bold">Ma stack</h2>
            {stack.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-muted px-3 py-1.5 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
