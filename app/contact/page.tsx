// app/contact/page.tsx

import { Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { getPublicSocialMedia } from "@/lib/data/public";
import { CV_URL, hasCv } from "@/lib/profile";
import Link from "next/link";
import FormContact from "@/components/contact/form-contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact : échangeons sur votre poste",
  "Vous recrutez un développeur full stack ? Contactez Laurent Vuillaume, en recherche de CDI à Paris ou en remote.",
  "/contact",
);


export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const socialMedias = await getPublicSocialMedia();
  const cvAvailable = hasCv();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6 md:pt-16">
      <div>
        <div className="mb-14 flex flex-col gap-3">
          <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">
            Contact
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            Une offre, une question ? Écrivez-moi, je réponds rapidement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Localisation</h3>
                  <p className="text-muted-foreground">Paris, France</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <a
                    href="mailto:figura.graphik@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    figura.graphik@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Téléphone</h3>
                  <a
                    href="tel:+33681747613"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +33 6 81 74 76 13
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="mb-6 font-display text-2xl font-bold">
                Me retrouver
              </h2>
              <div className="flex flex-wrap gap-3">
                {cvAvailable && (
                  <a
                    href={CV_URL}
                    download
                    className="inline-flex h-12 items-center gap-2 rounded-2xl bg-foreground px-5 font-semibold text-background transition-opacity hover:opacity-90"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger le CV
                  </a>
                )}
                {socialMedias.map(
                    (social: { id: string; name: string; linkUrl: string }) => (
                      <Link
                        key={social.name}
                        href={social.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-2xl border bg-card px-5 font-semibold transition-colors hover:bg-accent"
                      >
                        {/github/i.test(social.name) ? (
                          <Github className="h-4 w-4" />
                        ) : /linkedin/i.test(social.name) ? (
                          <Linkedin className="h-4 w-4" />
                        ) : null}
                        {social.name}
                      </Link>
                    ),
                  )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-8">
            <h2 className="mb-6 font-display text-2xl font-bold">
              Envoyez-moi un message
            </h2>
            <FormContact />
          </div>
        </div>
      </div>
    </div>
  );
}
