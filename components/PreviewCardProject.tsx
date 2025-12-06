import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCardType } from "@/types";
import { Technology } from "@prisma/client";
import Image from "next/image";

const PreviewCardProject = ({ project }: { project: ProjectCardType }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card">
      <div className="aspect-video bg-muted/50 flex items-center justify-center">
        <Image
          src={project?.image || ""}
          alt={project?.title || ""}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">Projet {project.title}</h3>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <div className="flex space-x-2">
            {project?.technologies?.map((tag: Technology, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
                {tag?.name}
              </span>
            ))}
          </div>
        </div>
        <Button variant="link" className="mt-4 p-0 h-auto text-primary" asChild>
          <Link href={`/projects/${project.slug}`}>
            Voir le projet
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PreviewCardProject;
