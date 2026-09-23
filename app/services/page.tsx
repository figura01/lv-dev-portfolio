import { pageMetadata } from "@/lib/seo";

import { ProcessSection } from "@/components/services/process-section";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesList } from "@/components/services/services-list";

export const metadata = pageMetadata(
  "Services de développement web et mobile sur mesure",
  "Création de sites web, applications mobiles et solutions sur mesure : découvrez les services de LVDEV et mon accompagnement pour concrétiser votre projet.",
  "/services",
);

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