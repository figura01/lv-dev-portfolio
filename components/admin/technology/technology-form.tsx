// components/admin/technologies/technology-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createTechnologySchema,
  updateTechnologySchema,
} from "@/lib/validators";

import {
  createTechnology,
  updateTechnology,
} from "@/lib/actions/technology.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { technologyFormDefaultValues } from "@/lib/constantes";

const TechnologyForm = ({
  type,
  technology,
  technologyId,
}: {
  type: "create" | "update";
  technology?: z.infer<typeof createTechnologySchema>;
  technologyId?: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isUpdate = type === "update";

  type FormValues = z.infer<typeof createTechnologySchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(
      isUpdate ? updateTechnologySchema : createTechnologySchema
    ),
    defaultValues: (technology && isUpdate
      ? { ...technology }
      : technologyFormDefaultValues) as FormValues,
  });

  const onSubmit = async (values: z.infer<typeof createTechnologySchema>) => {
    setIsLoading(true);
    try {
      if (!isUpdate) {
        const res = await createTechnology(values);
        if (!res) {
          toast.error("Une erreur est survenue");
          return;
        }
        const { success, message } = res;
        if (success) {
          toast.success("Technologie créée avec succès");
          router.push("/admin/technologies");
          router.refresh();
        } else {
          toast.error(message);
        }
      } else {
        if (!technologyId) {
          router.push("/admin/technologies");
          return;
        }

        const res = await updateTechnology({
          ...values,
          id: technologyId,
        });
        if (res.success) {
          toast.success("Technologie mise à jour avec succès");
          router.push("/admin/technologies");
          router.refresh();
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="text-gray-500"
                    placeholder="Nom de la technologie"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/technologies")}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Enregistrement..."
              : type === "update"
              ? "Mettre à jour"
              : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TechnologyForm;
