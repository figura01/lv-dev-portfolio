import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { Card, CardContent } from "@/components/ui/card";

export default async function CreateProjectPage() {
  const technologies = await prisma.technology.findMany({
    orderBy: { name: "asc" },
  });
  if (!technologies) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">Aucune technologie trouvée</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Créer Un Projet</h1>
      </div>
      <Card>
        <CardContent>
          <ProjectForm type="create" technologies={technologies} />
        </CardContent>
      </Card>
    </div>
  );
}
