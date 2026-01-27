// app/contact/page.tsx

import {
  Send,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Form,
} from "lucide-react";
import { getAllSocialMedia } from "@/lib/actions/social-media.actions";
import Link from "next/link";
import FormContact from "@/components/contact/form-contact";

export default async function ContactPage() {
  const { data: socialMedias } = await getAllSocialMedia();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-moi</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une question ou un projet ? N&apos;hésitez pas à me contacter
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
              <h2 className="text-2xl font-semibold mb-6">Réseaux Sociaux</h2>
              <div className="flex gap-4">
                {socialMedias &&
                  socialMedias.map(
                    (social: { id: string; name: string; linkUrl: string }) => (
                      <Link
                        key={social.name}
                        href={social.linkUrl}
                        target="_blank"
                        className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-colors"
                      >
                        {social.name === "Github" ? (
                          <Github />
                        ) : social.name === "Linkedin" ? (
                          <Linkedin />
                        ) : null}
                        <span className="sr-only">{social.name}</span>
                      </Link>
                    )
                  )}
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl border shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Envoyez-moi un message
            </h2>
            <FormContact />
          </div>
        </div>
      </div>
    </div>
  );
}
