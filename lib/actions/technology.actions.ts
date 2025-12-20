"use server";

import { prisma } from "@/lib/prisma";
// import { Technology } from "@prisma/client";
import {
  createTechnologySchema,
  updateTechnologySchema,
} from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getAllTechnology() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!technologies) throw new Error("Pas de technologie touvées");

    console.log(
      "technologies: ",
      technologies,
      "typeof technologies: ",
      typeof technologies
    );

    return {
      success: true,
      message: "Successfully created a new technology",
      data: technologies,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Errur lors du fetching des tchnologies");
  }
}

export async function updateTechnology(
  data: z.infer<typeof updateTechnologySchema>
) {
  try {
    const technology = updateTechnologySchema.parse(data);
    const technologyExisted = await prisma.technology.findFirst({
      where: { id: technology.id },
    });

    if (!technologyExisted) throw new Error("La technologie n'existe pas");

    await prisma.technology.update({
      where: { id: technology.id },
      data: technology,
    });
    revalidatePath("/admin/technologies");
    return { success: true, message: "Technologie mise à jour" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Fail to update technology",
    };
  }
}

export async function createTechnology(
  data: z.infer<typeof createTechnologySchema>
) {
  console.log(data);
  const validTech = createTechnologySchema.parse(data);
  console.log("isValidTech? : ", validTech);
  try {
    const tech = await prisma.technology.create({
      data: {
        name: data.name,
      },
    });
    if (!tech) throw new Error("Fail to create a new Tech");

    return {
      success: true,
      message: "Successfully created a new technology",
      data: tech,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Fail to create a new technology",
    };
  }
}

export async function deleteTechnology(id: string) {
  try {
    const existedTech = await prisma.technology.findFirst({
      where: { id },
    });
    if (!existedTech) throw new Error("Technolgiy not found");
    await prisma.technology.delete({
      where: { id },
    });
    return {
      success: true,
      message: `Successfully deleted technology ID: ${existedTech.id}, Name:${existedTech.name}}`,
    };
  } catch (error) {
    console.error(error);
    // throw new Error("Error when try to delete Technology")

    return {
      success: false,
      message: `Successfully deleted technology`,
    };
  }
}

export async function getTechnologyByName(name: string) {
  console.log("techno name:", name);
  try {
    const existedTech = await prisma.technology.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });
    if (!existedTech) throw new Error("Technology not found");
    console.log("existed tech: ", existedTech);
    return {
      success: true,
      message: "Find successfully technology",
      data: existedTech,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}

export async function getTechnologyById(id: string) {
  const technology = await prisma.technology.findFirst({
    where: { id },
  });

  if (!technology) throw new Error("Technology not found");

  return technology;
}
