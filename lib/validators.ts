// lib/validations/project.ts
import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug doit contenir au moins 3 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  excerpt: z
    .string()
    .min(20, "Le contenu doit contenir au moins 20 caractères"),
  image: z.string().url("L'URL de l'image n'est pas valide").or(z.literal("")),
  published: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  features: z.array(z.string()),
  technologies: z
    .array(z.string())
    .min(1, "Sélectionnez au moins une technologie"),
  link_url: z.string().url("L'URL n'est pas valide").or(z.literal("")),
});
export const createProjectSchema = projectSchema;
// For update
export const updateProjectSchema = projectSchema.extend({
  id: z.string(),
});

////////////////////////////////////////////////////////////
// Technologies
// Schéma de validation avec Zod
export const technologySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  // Ajoutez d'autres champs si nécessaire (icône, couleur, etc.)
});

// Type déduit du schéma
export const insertTechnologySchema = technologySchema;
export const updateTechnologySchema = technologySchema.extend({
  id: z.string(),
});
