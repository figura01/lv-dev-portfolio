// components/admin/projects/project-form.tsx
"use client";

import { useState } from "react";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Project, Technology } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { createProject, updateProject } from "@/lib/actions/project.actions";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { updateProjectSchema, insertProjectSchema } from "@/lib/validators";
import { Loader2, Plus, X } from "lucide-react";
import { projectDefaultValues } from "@/lib/constantes";
import { Card, CardContent } from "@/components/ui/card";

export const ProjectForm = ({
  type,
  project,
  projectId,
  technologies,
}: {
  type: "create" | "update";
  project?: Project & { technologies: Technology[] };
  projectId?: string;
  technologies: Technology[];
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof insertProjectSchema>>({
    resolver: zodResolver(
      type === "update" ? updateProjectSchema : insertProjectSchema
    ),
    defaultValues:
      project && type === "update"
        ? {
            ...project,
            technologies: project.technologies.map((t) => t.id),
          }
        : projectDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProjectSchema>> = async (
    values
  ) => {
    setIsLoading(true);
    if (type !== "update") {
      const result = await createProject({
        ...values,
      });
      if (result.success) {
        toast.success(result.message);
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } else {
      if (!projectId) {
        router.push("/admin/projects");
        return;
      }
      const res = await updateProject({
        ...values,
        id: projectId,
        technologies: values.technologies || [],
        features: values.features || [],
        link_url: values.link_url || "",
      });
      if (res.success) {
        toast.success(res.message);
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Titre du projet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="titre-du-projet" {...field} />
                </FormControl>
                <FormDescription>
                  L&apos;URL conviviale pour le projet
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description courte</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Une brève description du projet"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Contenu détaillé</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contenu détaillé du projet"
                    rows={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="upload-field flex flex-col md:flex-row gap-5">
            <FormField
              control={form.control}
              name="image"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof insertProjectSchema>,
                  "image"
                >;
              }) => (
                <FormItem className="w-full">
                  <FormLabel>Image</FormLabel>
                  <Card>
                    <CardContent>
                      <div className="flex-start space-x-2">
                        {field.value && (
                          <Image
                            key={field.value}
                            src={field.value}
                            alt="Product image"
                            width={100}
                            height={100}
                            className="w-20 h-20 object-cover object-center rounded-sm"
                          />
                        )}
                        <FormControl>
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              // res is an array of files, we take the first one
                              if (res && res.length > 0) {
                                form.setValue("image", res[0].url);
                              }
                            }}
                            onUploadError={(error: Error) => {
                              toast.error(`ERROR! ${error.message}`);
                            }}
                          />
                        </FormControl>
                      </div>
                    </CardContent>
                  </Card>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="technologies"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Technologies</FormLabel>
                  <FormDescription>
                    Sélectionnez les technologies utilisées
                  </FormDescription>
                </div>
                <Card>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {technologies?.map((tech) => (
                        <FormField
                          key={tech.id}
                          control={form.control}
                          name="technologies"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={tech.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(tech.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            tech.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== tech.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {tech.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="link_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://exemple.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publier le projet</FormLabel>
                    <FormDescription>
                      Le projet sera visible publiquement
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1">
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mettre en avant</FormLabel>
                    <FormDescription>
                      Afficher ce projet en première page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Fonctionnalités */}
        <div>
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => {
              // S'assurer que features est toujours un tableau
              const currentFeatures = (() => {
                if (!field.value) return [""];
                if (!Array.isArray(field.value)) return [""];
                if (field.value.length === 0) return [""];
                return field.value.map((feature) => feature || "");
              })();

              return (
                <FormItem className="md:col-span-2">
                  <FormLabel>Fonctionnalités</FormLabel>
                  <div className="space-y-2">
                    {currentFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...currentFeatures];
                              newFeatures[index] = e.target.value;
                              field.onChange(newFeatures);
                            }}
                            placeholder={`Fonctionnalité ${index + 1}`}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newFeatures = currentFeatures.filter(
                              (_, i) => i !== index
                            );
                            field.onChange(
                              newFeatures.length > 0 ? newFeatures : [""]
                            );
                          }}
                          disabled={currentFeatures.length <= 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        field.onChange([...currentFeatures, ""]);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter une fonctionnalité
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "update" ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
