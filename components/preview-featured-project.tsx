import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/actions/project.actions";
import PreviewProjectCard from "@/components/preview-project-card";

const PreviewFeaturedProjects = async () => {
  const { data: projects } = await getFeaturedProjects();
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Projets Récents
            </h2>
            <p className="text-muted-foreground">
              Découvrez quelques-unes de mes dernières réalisations
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link href="/projects">Voir tous les projets</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects &&
            projects.map((item) => (
              <PreviewProjectCard key={item.id} project={item} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewFeaturedProjects;
