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
import {
  getAllExperience,
  deleteExperience,
} from "@/lib/actions/experience.actions";
import { Plus, Pencil } from "lucide-react";

export default async function AdminProjectsPage() {
  const { data: experiences } = await getAllExperience();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Expériences</h1>
        <Button asChild>
          <Link href="/admin/experiences/create">
            <Plus className="mr-2 h-4 w-4" />
            Créer
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
                <TableHead>DATE DE DEBUT</TableHead>
                <TableHead>DATE DE FIN</TableHead>
                <TableHead>ROLE</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences && experiences.length > 0 ? (
                experiences.map((experience) => (
                  <TableRow key={experience.id}>
                    <TableCell className="font-medium">
                      {experience.title}
                    </TableCell>

                    <TableCell className="font-medium flex gap-2">
                      {new Date(experience.startDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      {new Date(experience.endDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{experience.role}</TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/experiences/${experience.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                      </Button>
                      <DeleteDialog
                        id={experience.id}
                        action={deleteExperience}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Aucune Experience
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
