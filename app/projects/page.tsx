// app/projets/page.tsx
import Link from "next/link";
import { getAllProjects } from "@/lib/actions/project.actions";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="group"
          >
            <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={200}
                    height={150}
                    className="object-fill"
                    priority
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-muted rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
