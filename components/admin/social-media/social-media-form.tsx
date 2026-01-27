"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createSocialMediaSchema,
  updateSocialMediaSchema,
} from "@/lib/validators";
import {
  createSocialMedia,
  updateSocialMedia,
} from "@/lib/actions/social-media.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const SocialMediaForm = ({
  type,
  socialMediaId,
  socialMedia,
}: {
  type: string;
  socialMediaId?: string;
  socialMedia?: z.infer<typeof createSocialMediaSchema>;
}) => {
  const router = useRouter();
  const isUpdate = type === "Update";
  console.log("isUpdate: ", isUpdate);
  const form = useForm({
    resolver: zodResolver(
      isUpdate ? updateSocialMediaSchema : createSocialMediaSchema
    ),
    defaultValues:
      socialMedia && isUpdate
        ? { ...socialMedia }
        : {
            name: "",
            linkUrl: "",
          },
  });

  const onSubmit = async (values: { name: string; linkUrl: string }) => {
    console.log(values);

    try {
      if (!isUpdate) {
        console.log("test create social-media");
        const newSocialMedia = await createSocialMedia(values);
        if (!newSocialMedia) {
          toast.error("Une erreur est survenue");
          return;
        }

        const { success, message } = newSocialMedia;
        if (success) {
          toast.success("Technologie créée avec succès");
          router.push("/admin/social-media");
          router.refresh();
        } else {
          toast.error(message);
        }
      } else {
        if (!socialMediaId) {
          router.push("/admin/social-media");
          return;
        }

        const res = await updateSocialMedia({
          id: socialMediaId,
          data: { ...values, id: socialMediaId },
        });

        if (res.success) {
          toast.success("Le social media a bien été mis à jour");
          router.push("/admin/social-media");
          router.refresh();
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      toast.error(`Error fail to create a new social media, ${error}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Entrer un nom" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="linkUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="https://socialmedia.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button>{isUpdate ? "Mettre à jour" : "Créer"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default SocialMediaForm;
