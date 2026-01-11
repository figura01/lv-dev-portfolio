// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique d'envoi du formulaire
    console.log("Formulaire soumis:", formData);
    // alert("Message envoyé avec succès !");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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

            {/* <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Réseaux Sociaux</h2>
              <div className="flex gap-4">
                {["Twitter", "GitHub", "LinkedIn", "Dribbble"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 transition-colors"
                    aria-label={social}
                  >
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
            </div> */}
          </div>

          <div className="bg-card p-8 rounded-xl border shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">
              Envoyez-moi un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none"
                  >
                    Votre nom <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none"
                  >
                    Votre email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium leading-none"
                >
                  Sujet
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none"
                >
                  Votre message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
