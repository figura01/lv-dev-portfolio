// app/projets/page.tsx
import { getPublicProjects } from "@/lib/data/public";
import ProjectCard from "@/components/project-card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Portfolio : mes projets web et applications",
  "Les projets de Laurent Vuillaume, développeur full stack : applications web conçues de bout en bout, du besoin à la mise en ligne, et les technologies utilisées.",
  "/projects",
);

// Rendu à la demande ; les données viennent du cache (lib/data/public.ts).
export const dynamic = "force-dynamic";

export default async function ProjetsPage() {
  const projects = await getPublicProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-14 flex flex-col gap-3">
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">
          Projets
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          Des applications web conçues de bout en bout, du besoin à la mise en
          ligne.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
