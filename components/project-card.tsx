import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { IProject } from "@/types";

type ProjectCardData = Pick<
  IProject,
  "title" | "slug" | "excerpt" | "image" | "features" | "publishedAt"
> & { technologies: { id: string; name: string }[] };

// Fonds teintés des visuels, appliqués à tour de rôle.
const coverTints = [
  "bg-[#dce6ff] dark:bg-[#1c2a52]",
  "bg-[#ffe8d6] dark:bg-[#3a2620]",
  "bg-[#dcf5e6] dark:bg-[#1d3a2c]",
  "bg-[#ede6ff] dark:bg-[#2d2350]",
];
const badgeTints = ["bg-[#1f4fd8]", "bg-[#c2410c]", "bg-[#15803d]", "bg-[#6d3ae8]"];

function initials(title: string) {
  return title
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

const ProjectCard = ({
  project,
  index = 0,
}: {
  project: ProjectCardData;
  index?: number;
}) => {
  const tint = index % coverTints.length;
  const features = project.features?.filter(Boolean).slice(0, 3) ?? [];
  const date = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-[28px] border bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(36,89,240,0.45)]"
    >
      {/* Visuel */}
      <div
        className={`flex h-64 items-end justify-center overflow-hidden sm:h-72 ${coverTints[tint]}`}
      >
        {project.image && (
          <div className="relative h-[84%] w-[84%] overflow-hidden rounded-t-2xl shadow-[0_-10px_40px_-16px_rgba(14,21,37,0.35)] transition-transform duration-500 group-hover:scale-[1.03]">
            <Image
              src={project.image}
              alt={`Aperçu du projet ${project.title}`}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 px-7 pb-7">
        {/* Pastille + date */}
        <div className="-mt-8 flex items-end justify-between">
          <span
            className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-card font-display text-lg font-bold text-white ${badgeTints[tint]}`}
          >
            {initials(project.title)}
          </span>
          {date && (
            <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground first-letter:uppercase">
              {date}
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-[28px]">
          {project.title}
        </h3>

        {project.technologies.length > 0 && (
          <p className="text-sm font-medium text-primary">
            {project.technologies.map((tech) => tech.name).join(" · ")}
          </p>
        )}

        <p className="line-clamp-3 leading-relaxed text-muted-foreground">
          {project.excerpt}
        </p>

        {features.length > 0 && (
          <div className="flex flex-col gap-2.5 rounded-2xl bg-muted/70 p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ce que j&apos;ai construit
            </span>
            {features.map((feature) => (
              <span key={feature} className="flex gap-2.5 text-[15px]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span className="line-clamp-2">{feature}</span>
              </span>
            ))}
          </div>
        )}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold">
          Voir l&apos;étude de cas
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
