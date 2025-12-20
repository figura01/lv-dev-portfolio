// app/projets/page.tsx
import { getAllProjects } from "@/lib/actions/project.actions";
import ProjectCard from "@/components/project-card";

export default async function ProjetsPage() {
  const { data: projects } = await getAllProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mes Projets</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Découvrez mes réalisations et projets récents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
