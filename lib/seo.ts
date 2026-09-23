import type { Metadata } from "next";

// Keep canonical URLs on the public domain, including on preview deployments.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = new URL(
  configuredUrl || "https://laurent-vuillaume.ovh",
).origin;
export const siteName = "LVDEV";
export const defaultTitle = "Développeur web full stack freelance | LVDEV";
export const defaultDescription =
  "Développeur full stack freelance, je crée vos sites et applications web sur mesure avec React et Next.js. Découvrez mes réalisations et parlons de votre projet.";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: new URL(path, siteUrl).href },
    openGraph: {
      title: fullTitle,
      description,
      siteName,
      locale: "fr_FR",
      type: "website",
      url: new URL(path, siteUrl).href,
    },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
