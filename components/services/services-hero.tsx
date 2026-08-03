import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_45%)]" />

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            Mes services
          </Badge>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Des solutions numériques conçues pour votre projet
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            Je conçois des applications web et mobiles modernes, performantes
            et évolutives, adaptées à vos besoins et à vos objectifs.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Discuter de votre projet
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/projects">Voir mes réalisations</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}