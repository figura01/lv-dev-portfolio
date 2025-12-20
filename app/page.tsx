import Link from "next/link";
import { ArrowRight, Code, Cpu, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const services = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Développement Web",
      description: "Sites web modernes et applications web réactives",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Applications Mobiles",
      description: "Applications iOS et Android natives ou cross-platform",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Solutions sur Mesure",
      description: "Développement de solutions personnalisées",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border bg-muted/50 text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-primary mr-2" />
              Développeur Full Stack Freelance
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Je crée des expériences numériques{" "}
              <span className="text-primary">exceptionnelles</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Je conçois et développe des applications web et mobiles
              performantes, accessibles et centrées sur l&apos;utilisateur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Me contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projets">Voir mes projets</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mes Services
            </h2>
            <p className="text-muted-foreground">
              Des solutions sur mesure pour répondre à tous vos besoins
              numériques
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services?.map((service, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  En savoir plus
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Projets Récents
              </h2>
              <p className="text-muted-foreground">
                Découvrez quelques-unes de mes dernières réalisations
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/projects">Voir tous les projets</Link>
            </Button>
          </div>

          {/* <div className="grid md:grid-cols-2 gap-8">
            {projects?.map((item) => (
              <PreviewCardProject key={item.id} project={item} />
            ))}
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto mb-10">
            Je suis là pour vous aider à transformer vos idées en réalité.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Discutons de votre projet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
