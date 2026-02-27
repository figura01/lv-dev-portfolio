"use client";

import { Send, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { formContactSchema } from "@/lib/validators";
import { formContactValues } from "@/lib/constantes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const FormContact = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(formContactSchema),
    defaultValues: formContactValues,
  });

  const onSubmit = async (values: z.infer<typeof formContactSchema>) => {
    console.log("Formulaire soumis:", values);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        message: values.message,
      }),
    });
    console.log(res);
    if (!res) {
      toast.error("Une erreur est survenue lors de l'envoi du message.");
      return;
    }
    form.reset();
    toast.success("Message envoyé avec succès !");
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Votre nom <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      name="name"
                      type="text"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Votre email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      name="email"
                      type="email"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sujet</FormLabel>
                <FormControl>
                  <Input {...field} id="subject" name="subject" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Votre message <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="message"
                    name="message"
                    rows={5}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={isPending}>
          {isPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Envoi...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {isPending ? "Envoie du message..." : "Envoyer le message"}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormContact;
