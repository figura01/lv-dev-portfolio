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
// import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteDialog from "@/components/admin/delete-dialog";
import { deleteTechnology } from "@/lib/actions/technology.actions";
import { Plus, Pencil } from "lucide-react";

export default async function AdminTechnologiesPage() {
  const technologies = await prisma.technology.findMany({
    orderBy: { name: "asc" },
  });
  console.log(technologies);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Technologies</h1>
        <Button asChild>
          <Link href="/admin/technologies/create">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Technologie
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des technologies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technologies && technologies.length > 0 ? (
                technologies.map((technology) => (
                  <TableRow key={technology.id}>
                    <TableCell className="font-medium">
                      {technology.name}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/technologies/${technology.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                      </Button>
                      <DeleteDialog
                        id={technology.id}
                        action={deleteTechnology}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    Aucune technologie trouvée
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
