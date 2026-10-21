import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublicFeaturedProjects } from "@/lib/data/public";
import ProjectCard from "@/components/project-card";

const PreviewFeaturedProjects = async () => {
  const projects = await getPublicFeaturedProjects();
  if (projects.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Projets sélectionnés
          </h2>
          <p className="text-lg text-muted-foreground">
            Des produits complets, du besoin à la mise en ligne.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 py-2 font-semibold text-primary hover:underline"
        >
          Tous les projets
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((item, index) => (
          <ProjectCard key={item.id} project={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PreviewFeaturedProjects;
