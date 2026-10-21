// app/projects/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";

import { getPublicProjectBySlug } from "@/lib/data/public";
import { pageMetadata } from "@/lib/seo";

// Rendu à la demande ; les données viennent du cache (lib/data/public.ts).
export const dynamic = "force-dynamic";

const loadProject = cache(getPublicProjectBySlug);

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = await loadProject(slug);
  if (!project) notFound();
  return pageMetadata(
    `${project.title} : étude de cas`,
    project.excerpt || project.description.slice(0, 160),
    `/projects/${encodeURIComponent(project.slug)}`,
  );
}

export default async function ProjectDetails(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = await loadProject(slug);
  if (!project) notFound();

  // Les dates sortent du cache sous forme de chaînes.
  const date = new Date(project.publishedAt ?? project.createdAt);
  const dateLabel = date.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  const features = project.features.filter(Boolean);
  const paragraphs = project.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:px-6 md:pt-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les projets
      </Link>

      {/* En-tête */}
      <header className="mt-8 flex flex-col gap-6">
        <span className="self-start rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground first-letter:uppercase">
          <time dateTime={date.toISOString()}>{dateLabel}</time>
        </span>
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          {project.title}
        </h1>
        {project.excerpt && (
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {project.excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {project.link_url && (
            <a
              href={project.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-foreground px-5 font-semibold text-background transition-opacity hover:opacity-90"
            >
              Voir le projet en ligne
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="rounded-lg border bg-card px-3 py-1.5 text-sm"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Visuel */}
      {project.image && (
        <div className="mt-12 flex h-[300px] items-end justify-center overflow-hidden rounded-[32px] bg-[#dce6ff] sm:h-[420px] md:h-[560px] dark:bg-[#1c2a52]">
          <div className="relative h-[88%] w-[88%] overflow-hidden rounded-t-2xl shadow-[0_-10px_40px_-16px_rgba(14,21,37,0.35)]">
            <Image
              src={project.image}
              alt={`Aperçu du projet ${project.title}`}
              fill
              priority
              sizes="(min-width: 1152px) 1000px, 90vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-14">
          <section className="flex flex-col gap-5">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Le projet
            </h2>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-line text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>

          {features.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                Ce que j&apos;ai construit
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 rounded-2xl border bg-card p-5"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* En bref */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-6 rounded-3xl border bg-card p-7">
            <h2 className="font-display text-xl font-bold">En bref</h2>
            <dl className="flex flex-col gap-5 text-sm">
              <div className="flex flex-col gap-1.5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </dt>
                <dd className="first-letter:uppercase">{dateLabel}</dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Stack
                </dt>
                <dd>
                  {project.technologies.map((tech) => tech.name).join(" · ")}
                </dd>
              </div>
              {project.link_url && (
                <div className="flex flex-col gap-1.5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    En ligne
                  </dt>
                  <dd>
                    <a
                      href={project.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all font-medium text-primary hover:underline"
                    >
                      {project.link_url.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </aside>
      </div>

      {/* Appel à l'action */}
      <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[32px] bg-[#0e1525] p-8 text-white md:flex-row md:items-center md:p-12 dark:border dark:bg-card">
        <h2 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
          Ce projet vous parle ?
          <br />
          Parlons de votre équipe.
        </h2>
        <Link
          href="/contact"
          className="inline-flex h-14 shrink-0 items-center gap-2 rounded-2xl bg-white px-7 font-semibold text-[#0e1525] transition-opacity hover:opacity-90"
        >
          Me contacter
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
