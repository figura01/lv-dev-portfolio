// Lectures publiques mises en cache (Next.js Data Cache).
// Les pages restent rendues à la demande, mais la base n'est interrogée qu'une
// fois par heure au maximum, ou juste après une modification dans l'admin
// (voir revalidateTag dans lib/actions/*).
//
// Les fonctions en cache LÈVENT une erreur en cas d'échec : une erreur n'est
// jamais mise en cache, la requête suivante réessaiera.
//
// Attention : le cache sérialise en JSON, les dates ressortent en chaînes.
// Toujours les relire avec `new Date(...)`.
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const CACHE_TAGS = {
  projects: "projects",
  experiences: "experiences",
  socialMedia: "social-media",
} as const;

const ONE_HOUR = 60 * 60;

// Du projet le plus récent au plus ancien, selon la date affichée sur les cards.
const newestFirst = [
  { publishedAt: "desc" as const },
  { createdAt: "desc" as const },
];

const projectInclude = {
  technologies: { select: { id: true, name: true } },
} as const;

const cachedFeaturedProjects = unstable_cache(
  () =>
    prisma.project.findMany({
      where: { isFeatured: true, published: true },
      orderBy: newestFirst,
      include: projectInclude,
      take: 2,
    }),
  ["featured-projects-newest-first"],
  { tags: [CACHE_TAGS.projects], revalidate: ONE_HOUR },
);

const cachedAllProjects = unstable_cache(
  () =>
    prisma.project.findMany({
      orderBy: newestFirst,
      include: projectInclude,
    }),
  ["all-projects-newest-first"],
  { tags: [CACHE_TAGS.projects], revalidate: ONE_HOUR },
);

const cachedProjectBySlug = unstable_cache(
  (slug: string) =>
    prisma.project.findFirst({ where: { slug }, include: projectInclude }),
  ["project-by-slug"],
  { tags: [CACHE_TAGS.projects], revalidate: ONE_HOUR },
);

const cachedExperiences = unstable_cache(
  () => prisma.experience.findMany({ orderBy: { createdAt: "asc" } }),
  ["experiences"],
  { tags: [CACHE_TAGS.experiences], revalidate: ONE_HOUR },
);

const cachedSocialMedia = unstable_cache(
  () => prisma.socialMedia.findMany({ orderBy: { name: "asc" } }),
  ["social-media"],
  { tags: [CACHE_TAGS.socialMedia], revalidate: ONE_HOUR },
);

async function safe<T>(label: string, load: () => Promise<T>, fallback: T) {
  try {
    return await load();
  } catch (error) {
    console.error(`[data] ${label}:`, error);
    return fallback;
  }
}

export const getPublicFeaturedProjects = () =>
  safe("projets mis en avant", cachedFeaturedProjects, []);

export const getPublicProjects = () =>
  safe("projets", cachedAllProjects, []);

export const getPublicProjectBySlug = (slug: string) =>
  safe("projet " + slug, () => cachedProjectBySlug(slug), null);

export const getPublicExperiences = () =>
  safe("expériences", cachedExperiences, []);

export const getPublicSocialMedia = () =>
  safe("réseaux sociaux", cachedSocialMedia, []);
