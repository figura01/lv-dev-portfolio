// app/admin/technologies/page.tsx
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
import Link from "next/link";
import DeleteDialog from "@/components/admin/delete-dialog";
import { getAllProjects, deleteProject } from "@/lib/actions/project.actions";
import { Plus, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminProjectsPage() {
  const { data: projects } = await getAllProjects();
  console.log("projects: ", projects);
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Projets</h1>
        <Button asChild>
          <Link href="/admin/projects/create">
            <Plus className="mr-2 h-4 w-4" />
            Créer un projet
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
                <TableHead>TITRE</TableHead>
                <TableHead>TECHNOLOGIES</TableHead>
                <TableHead>MIS EN AVANT</TableHead>
                <TableHead>PUBLIER</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>

                    <TableCell className="font-medium flex gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech.id}>{tech.name}</Badge>
                      ))}
                    </TableCell>

                    <TableCell>
                      {project.isFeatured ? (
                        <Badge>Oui</Badge>
                      ) : (
                        <Badge>Non</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {project.published ? (
                        <Badge>Oui</Badge>
                      ) : (
                        <Badge>Non</Badge>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    Aucun Projet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
