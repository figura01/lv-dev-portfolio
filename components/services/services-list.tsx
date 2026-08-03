import { services } from "@/app/services/data.services";
import { ServiceCard } from "@/components/services/service-card";

export function ServicesList() {
  return (
    <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Expertise
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Des services adaptés à vos besoins
        </h2>

        <p className="mt-4 leading-7 text-muted-foreground">
          De la conception à la mise en production, je vous accompagne dans la
          création d’une solution fiable, maintenable et adaptée à votre
          activité.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}