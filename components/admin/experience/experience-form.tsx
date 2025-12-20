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

const ExperienceForm = ({ type }: { type: "Create" | "Update" }) => {
  const form = useForm({
    resolver: zodResolver(
      type === "Create" ? createExperienceSchema : updateExperienceSchema
    ),
    defaultValues: {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      role: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
                          form.setValue(
                            "startDate",
                            new Date(date).toISOString()
                          );
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
                          form.setValue(
                            "endDate",
                            new Date(date).toISOString()
                          );
                        }
                      }}
                    />
                  </div>
                )}
              />
            </div>

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
