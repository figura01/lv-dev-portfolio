import type { Metadata } from "next";

import { ProcessSection } from "@/components/services/process-section";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesList } from "@/components/services/services-list";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Développement web, applications mobiles et solutions numériques sur mesure.",
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