"use client";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema, updateProjectSchema } from "@/lib/validators";
import { projectFormDefaultValues } from "@/lib/constantes";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { createProject, updateProject } from "@/lib/actions/project.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";

export type TechnologyType = {
  id: string;
  name: string;
};

const ProjectForm = ({
  technologies,
  type,
  project,
  projectId,
}: {
  technologies: TechnologyType[];
  type: "Update" | "Create";
  project?:
    | z.infer<typeof updateProjectSchema>
    | z.infer<typeof createProjectSchema>;
  projectId?: string;
}) => {
  const router = useRouter();

  const isUpdate = type === "Update";

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(isUpdate ? createProjectSchema : updateProjectSchema),
    defaultValues:
      project && type
        ? {
            ...project,
          }
        : projectFormDefaultValues,
  });

  type FormValues = z.infer<typeof createProjectSchema>;

  const onSubmit = async (values: FormValues) => {
    console.log("values valid?: ", createProjectSchema.parse(values));
    if (!isUpdate) {
      console.log("Creating project...");
      console.log("values valid?: ", createProjectSchema.parse(values));
      const { message, success } = await createProject(values);
      if (success) {
        toast.success("Le projet à bien été créer!");
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast.error(message);
      }
    } else {
      if (!projectId) {
        router.push("/admin/projects");
        return;
      }

      const res = await updateProject(values, projectId);
      console.log(res);
    }
  };

  const image = form.watch("image");
  //const features = form.watch("features");

  return (
    <>
      <Card className="w-full mx-auto">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isUpdate ? "Editer le projet" : "Créer Un Project"}
            </CardTitle>
          </CardHeader>

          <Form {...form}>
            <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Title" />
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
                        <Input {...field} placeholder="slug" />
                      </FormControl>
                      <Button className="flex w-fit">Générer le slug</Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <Card>
                      <FormItem>
                        <FormControl>
                          <UploadButton
                            {...field}
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              const imageUrl = res?.[0]?.url;
                              console.log("Image URL from upload:", imageUrl);
                              if (imageUrl) {
                                form.setValue("image", imageUrl, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                  shouldTouch: true,
                                });
                                // Pas besoin de trigger ici, les options ci-dessus suffisent
                              }
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        </FormControl>

                        <div className="flex justify-center">
                          {image ? (
                            typeof image === "string" ? (
                              <>
                                <Image
                                  key={image}
                                  src={image}
                                  alt="Project preview"
                                  width={200}
                                  height={200}
                                  className="w-full max-w-[200px] h-auto object-cover rounded"
                                  onError={(e) => {
                                    console.error(
                                      "Erreur de chargement de l'image:",
                                      e
                                    );
                                    e.currentTarget.src =
                                      "/images/default-project.jpg";
                                  }}
                                />
                              </>
                            ) : null
                          ) : (
                            <p className="text-sm text-gray-500">
                              Aucune image sélectionnée
                            </p>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    </Card>
                  )}
                />

                <FormField
                  control={form.control}
                  name="technologies"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Technologies
                        </FormLabel>
                      </div>
                      <Card>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2">
                            {technologies &&
                              technologies?.map((tech) => (
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
                                            checked={field.value?.includes(
                                              tech.id
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value || []),
                                                    tech.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== tech.id
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

                <FormField
                  name="isFeatured"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="border rounded-md py-6">
                      <FormControl>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />

                          <FormLabel>Is Featured ?</FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="published"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="border rounded-md py-6">
                      <FormControl>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />

                          <FormLabel>Published ?</FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="link_url"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ILink URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="http://exemple.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 md:space-col-2">
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
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
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
              <div className="mt-6">
                <Button type="submit" className="w-full">
                  {isUpdate ? "Mettre à jour" : "Créer un projet"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectForm;
