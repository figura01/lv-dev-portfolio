"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormField } from "@/components/ui/form";
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "@/lib/validators";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CustomCalendar } from "./custom-calendar";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  createExperience,
  updateExperience,
} from "@/lib/actions/experience.actions";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { experienceFormDefaultValues } from "@/lib/constantes";

const ExperienceForm = ({
  type,
  experienceId,
  experience,
}: {
  type: "Create" | "Update";
  experienceId?: string;
  experience?: z.infer<typeof createExperienceSchema>;
}) => {
  const router = useRouter();
  const isUpdate = type === "Update";

  const form = useForm<z.infer<typeof createExperienceSchema>>({
    resolver: zodResolver(
      isUpdate ? updateExperienceSchema : createExperienceSchema
    ),
    defaultValues:
      experience && type
        ? {
            ...experience,
            startDate:
              experience.startDate instanceof Date
                ? experience.startDate
                : new Date(experience.startDate),
            endDate:
              experience.endDate instanceof Date
                ? experience.endDate
                : new Date(experience.endDate),
          }
        : {
            ...experienceFormDefaultValues,
            startDate: new Date(experienceFormDefaultValues.startDate),
            endDate: new Date(experienceFormDefaultValues.endDate),
          },
  });

  type FormValues = z.infer<typeof createExperienceSchema>;

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      if (!isUpdate) {
        const createdExperience = await createExperience(data);

        if (!createExperience) {
          toast.error("Une erreur est survenue");
        }

        if (createdExperience.success) {
          toast.success("Une experience a bien été créer!");
          router.push("/admin/experiences");
        }
      } else {
        if (!experienceId) {
          redirect("/admin/experiences");
        }
        const updatedExperience = await updateExperience(
          { ...data, id: experienceId.toString() },
          experienceId.toString()
        );

        if (updatedExperience.success) {
          toast.success("Une experience a bien été mettre à jour!");
          router.push("/admin/experiences");
        } else {
          toast.error(updatedExperience.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(`Une erreur est survenue, ${error}`);
    }
  };

  return (
    <Card className="p-6 w-full">
      <CardHeader>ExperienceForm</CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <div className="mb-4">
                    <Label className="mb-2 block">Titre</Label>
                    <Input placeholder="Titre" {...field} />
                  </div>
                )}
              />

              <FormField
                name="company"
                control={form.control}
                render={({ field }) => (
                  <div className="mb-4">
                    <Label className="mb-2 block">Entreprise</Label>
                    <Input placeholder="Entreprise" {...field} />
                  </div>
                )}
              />

              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <div className="mb-4">
                    <Label className="mb-2 block">Rôle</Label>
                    <Input placeholder="Rôle" {...field} />
                  </div>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <div className="mb-4">
                    <Label className="mb-2 block">Description</Label>
                    <Input placeholder="Description" {...field} />
                  </div>
                )}
              />

              <FormField
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <div className="w-full mb-4">
                    <CustomCalendar
                      {...field}
                      label="Date de début"
                      callback={(date) => {
                        if (date) {
                          form.setValue("startDate", new Date(date));
                        }
                      }}
                    />
                  </div>
                )}
              />

              <FormField
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <div className="mb-4">
                    <CustomCalendar
                      {...field}
                      label="Date de fin"
                      callback={(date) => {
                        if (date) {
                          form.setValue("endDate", new Date(date));
                        }
                      }}
                    />
                  </div>
                )}
              />
            </div>

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <div className="mb-4">
                  <Label className="mb-2 block">Status</Label>
                  <Input placeholder="Statut" {...field} />
                </div>
              )}
            />

            <Button type="submit" className="mt-4">
              {type === "Create" ? "Créer" : "Mettre à jour"} l&apos;expérience
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
