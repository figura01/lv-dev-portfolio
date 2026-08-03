import { processSteps } from "@/app/services/data.services";

export function ProcessSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Méthode
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Un processus simple et transparent
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Chaque étape est pensée pour vous offrir de la visibilité et
            garantir une réalisation alignée avec vos attentes.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <article key={step.number} className="relative">
              <span className="text-5xl font-bold text-primary/15">
                {step.number}
              </span>

              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}