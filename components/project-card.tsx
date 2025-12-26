"use client";
import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({
  project,
}: {
  project: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    technologies: { id: string; name: string }[];
  };
}) => {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="aspect-video bg-muted/50 flex items-center justify-center">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              width={200}
              height={150}
              className="w-full h-50 object-fill"
              priority
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4">
            {project.excerpt.slice(0, 150)}...
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
