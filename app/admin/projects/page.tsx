import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteDialog from "@/components/admin/delete-dialog";
import { deleteProject } from "@/lib/actions/project.actions";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      technologies: true,
    },
    orderBy: { title: "asc" },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <Button asChild>
          <Link href="/admin/projects/create">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau projet
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des projets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Mis en avant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="px-2 py-1 text-xs rounded-full bg-muted"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.published ? (
                      <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                        Publié
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-yellow-100 rounded-full">
                        Brouillon
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {project.isFeatured ? (
                      <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                        Oui
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-yellow-100 rounded-full">
                        Non
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/projects/${project.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Link>
                    </Button>
                    <DeleteDialog id={project.id} action={deleteProject} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
