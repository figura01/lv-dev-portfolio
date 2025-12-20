"use server";

import { createExperienceSchema } from "@/lib/validators";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function createExperience(
  data: z.infer<typeof createExperienceSchema>
) {
  try {
    const experience = await prisma.experience.create({
      data,
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
        createdAt: "desc",
      },
    });
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
