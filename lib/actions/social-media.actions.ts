"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  createSocialMediaSchema,
  updateSocialMediaSchema,
} from "../validators";

export async function getAllSocialMedia() {
  try {
    const data = await prisma.socialMedia.findMany({
      orderBy: {
        name: "asc",
      },
    });

    if (!data) throw new Error("No SocialMedia in database");

    return {
      success: true,
      message: "All social media successfully loaded ",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: ` Error to load all SocialMedia, ${error}`,
    };
  }
}

export async function createSocialMedia(
  data: z.infer<typeof createSocialMediaSchema>
) {
  console.log("data: ", data);
  try {
    const isValid = createSocialMediaSchema.parse(data);
    console.log("isValid: ", isValid);
    if (isValid) {
      const socialMedia = await prisma.socialMedia.create({
        data: {
          ...data,
        },
      });
      if (!socialMedia) throw new Error("Error when created new socialMedia");
      revalidatePath("/admin/social-media");
      console.log("socialMedia: ", socialMedia);
      return {
        success: true,
        message: "Social media successfully created",
        data: socialMedia,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error, failing to create new social media, ${error}`,
    };
  }
}

export async function deleteSocialMedia(id: string) {
  try {
    await prisma.socialMedia.delete({
      where: { id },
    });

    revalidatePath("/admin/social-media");
    return {
      success: true,
      message: `Social media sucessfully deleted, id: ${id}`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error, fail to delete social media, id ${id}, ${error}`,
    };
  }
}

export async function updateSocialMedia({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof updateSocialMediaSchema>;
}) {
  try {
    const sm = updateSocialMediaSchema.parse(data);
    if (!sm) throw new Error("Error, invalid data to update social media");
    const existedSm = await prisma.socialMedia.findFirst({
      where: { id },
    });

    if (!existedSm) throw new Error("Error, social media not found");

    await prisma.socialMedia.update({
      where: { id: existedSm.id },
      data: sm,
    });

    revalidatePath("/admin/social-media");

    return {
      success: true,
      message: `Social media successfully updated, id: ${id}`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error, fail to delete social media, id ${id}, ${error}`,
    };
  }
}

export async function getSocialMediaById(id: string) {
  try {
    const socialMedia = await prisma.socialMedia.findFirst({
      where: { id },
    });

    if (!socialMedia) throw new Error(`Social media not found, id: ${id}`);

    return {
      success: true,
      data: socialMedia,
      message: "Social media successfully loaded",
    };
  } catch (error) {
    return {
      success: false,
      message: `Fail to load social media, ${error}`,
    };
  }
}
