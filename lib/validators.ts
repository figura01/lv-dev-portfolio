// lib/validations/project.ts
import { z } from "zod";

// In your validators.ts
export const insertProjectSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug doit contenir au moins 3 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  excerpt: z.string().min(1, "L'extrait ne peut pas être vide"),
  image: z.string().url("L'URL de l'image n'est pas valide").or(z.literal("")),
  features: z.array(z.string()),
  technologies: z
    .array(z.string())
    .min(1, "Sélectionnez au moins une technologie"),
  link_url: z.string().url("L'URL n'est pas valide").or(z.literal("")),
  published: z.boolean(),
  isFeatured: z.boolean(),
});

export const updateProjectSchema = insertProjectSchema.extend({
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

/** USER */
// Shema for signing user in
export const signInFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  }),
});
