import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ServicesCta() {
  return (
    <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="relative overflow-hidden rounded-3xl border bg-primary px-6 py-14 text-primary-foreground shadow-xl sm:px-12 lg:px-16">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-primary-foreground/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">
            Votre projet
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Construisons une solution adaptée à vos ambitions
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-primary-foreground/80">
            Vous avez une idée, un projet ou un besoin spécifique ? Échangeons
            afin d’identifier la solution la plus adaptée.
          </p>

          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8"
          >
            <Link href="/contact">
              Me contacter
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}