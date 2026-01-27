import { z } from "zod";

// Technology
export const createTechnologySchema = z.object({
  name: z.string().min(2),
});

export const updateTechnologySchema = createTechnologySchema.extend({
  id: z.string(),
});

// PROJECTS
export const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre est requis et doit avoir au minimum 3 charactaires"),
  slug: z
    .string()
    .min(3, "Le slug est requis et doit avoir au minimum 3 charactaires"),
  description: z
    .string()
    .min(
      3,
      "La description est requise et doit avoir au minimum 3 charactaires"
    ),
  excerpt: z
    .string()
    .min(3, "L'exerpt est requis et doit avoir au minimum 3 charactaires"),
  image: z.string().url("L'URL de l'image n'est pas valide").or(z.literal("")),
  publishedAt: z.date(),
  published: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  features: z.array(z.string()).min(1, "Doit au moins avoir une features"),
  technologies: z
    .array(z.string())
    .min(1, "Sélectionnez au moins une technologie"),
  link_url: z.string().url("L'URL n'est pas valide").or(z.literal("")),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string(),
});

// EXPRIENCES

export const createExperienceSchema = z.object({
  title: z.string().min(3, ""),
  company: z.string().min(3, ""),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().min(3, ""),
  role: z.string().min(3, ""),
  status: z.string().min(3, ""),
});

export const updateExperienceSchema = createExperienceSchema.extend({
  id: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const createSocialMediaSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  linkUrl: z.string().min(2, "linkUrl doit contenir au moins 2 charactaires"),
});

export const updateSocialMediaSchema = createSocialMediaSchema.extend({
  id: z.string(),
});

export const formContactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom est requis et doit avoir au minimum 2 charactaires"),
  email: z.string().email("Email invalide"),
  subject: z
    .string()
    .min(2, "Le sujet est requis et doit avoir au minimum 2 charactaires"),
  message: z
    .string()
    .min(10, "Le message est requis et doit avoir au minimum 10 charactaires"),
  to: z.string().email("Email destinataire invalide"),
});
