import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Plus, Pencil } from "lucide-react";
import {
  getAllSocialMedia,
  deleteSocialMedia,
} from "@/lib/actions/social-media.actions";

const SocialMediaPage = async () => {
  const { data: socialMedias } = await getAllSocialMedia();
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Médias Sociaux</h1>
        <Button asChild>
          <Link href="/admin/social-media/create">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Media Social
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
                <TableHead>Link URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialMedias && socialMedias.length > 0 ? (
                socialMedias.map((sm) => (
                  <TableRow key={sm.id}>
                    <TableCell className="font-medium">{sm.name}</TableCell>
                    <TableCell className="font-medium">{sm.linkUrl}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/admin/social-media/${sm.id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Link>
                      </Button>
                      <DeleteDialog id={sm.id} action={deleteSocialMedia} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    Aucun Social Media trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaPage;
