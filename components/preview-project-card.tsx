import Link from "next/link";
import Image from "next/image";

import { IProject } from "@/types";

const PreviewProjectCard = ({ project }: { project: IProject }) => {
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
          <header className="flex justify-between items-center w-full mb-2">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="felx text-sm text-muted-foreground">
              {project.publishedAt.toLocaleDateString()}
            </p>
          </header>
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

export default PreviewProjectCard;
