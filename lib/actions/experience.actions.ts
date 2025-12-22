"use server";

import {
  createExperienceSchema,
  updateExperienceSchema,
} from "@/lib/validators";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createExperience(
  data: z.infer<typeof createExperienceSchema>
) {
  console.log("data:", data);
  try {
    const experience = await prisma.experience.create({
      data: {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      },
    });
    if (!experience) throw new Error("L'experience n'a pas été créer");
    return {
      success: true,
      data: experience,
      message: "L'experience a bien été créer",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}

export async function getAllExperience() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log("experiences: ", experiences);
    if (!experiences) throw new Error("Aucune expérience trouvé");

    return {
      success: true,
      data: experiences,
      message: "Liste des expériences chargée",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}

export async function updateExperience(
  data: z.infer<typeof updateExperienceSchema>,
  id: string
) {
  try {
    const existingExperience = await prisma.experience.findUnique({
      where: {
        id,
      },
    });
    if (!existingExperience) throw new Error("L'experience n'a pas été trouvé");
    await prisma.experience.update({
      data: {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      },
      where: {
        id,
      },
    });
    revalidatePath("/admin/experiences");
    return {
      success: true,
      data: existingExperience,
      message: "L'experience a bien été mise à jour",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}

export async function getExperienceById(id: string) {
  try {
    const experience = await prisma.experience.findFirst({
      where: {
        id,
      },
      orderBy: {
        endDate: "desc",
      },
    });
    if (!experience) throw new Error("Aucune expérience trouvé");
    return {
      message: "Experience chargée",
      data: experience,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}

export async function deleteExperience(id: string) {
  try {
    const existedExoerience = await prisma.experience.findFirst({
      where: { id },
    });
    if (!existedExoerience) throw new Error("L'experience n'a pas été trouvé");

    await prisma.experience.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin/experiences");
    return {
      success: true,
      data: existedExoerience,
      message: "L'experience a bien été supprimée",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}
