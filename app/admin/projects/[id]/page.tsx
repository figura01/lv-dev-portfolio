import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { Card, CardContent } from "@/components/ui/card";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id: id },
    include: { technologies: true },
  });

  if (!project) {
    notFound();
  }

  const technologies = await prisma.technology.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Editer Un Projet</h1>
      </div>
      <Card>
        <CardContent>
          <ProjectForm
            type="update"
            project={project}
            technologies={technologies}
            projectId={id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
