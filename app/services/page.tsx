import { pageMetadata } from "@/lib/seo";

import { ProcessSection } from "@/components/services/process-section";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesList } from "@/components/services/services-list";

// Page mise de côté tant que je ne suis pas freelance : hors menu, hors sitemap et non indexée.
// Pour la réactiver : retirer `robots` ci-dessous, remettre "/services" dans app/sitemap.ts
// et le lien dans components/navbar.tsx.
export const metadata = {
  ...pageMetadata(
    "Services de développement web et mobile sur mesure",
    "Création de sites web, applications mobiles et solutions sur mesure : découvrez les services de LVDEV et mon accompagnement pour concrétiser votre projet.",
    "/services",
  ),
  robots: { index: false, follow: true },
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />
      <ProcessSection />
      <ServicesCta />
    </main>
  );
}