// app/actions/technology.actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  insertTechnologySchema,
  updateTechnologySchema,
} from "@/lib/validators";
import { convertToPlainObject, formatError } from "../utils";

export async function createTechnology(
  data: z.infer<typeof insertTechnologySchema>
) {
  try {
    const technology = await prisma.technology.create({
      data: {
        name: data.name,
      },
    });
    revalidatePath("/admin/technologies");
    return { success: true, data: technology };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
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
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function deleteTechnology(id: string) {
  try {
    const technology = await prisma.technology.delete({
      where: { id },
    });
    revalidatePath("/admin/technologies");
    return {
      success: true,
      message: "Technology deleted successfully",
      data: technology,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getTechnologyById(id: string) {
  try {
    const data = await prisma.technology.findFirst({
      where: { id },
    });
    return convertToPlainObject(data);
  } catch (error) {
    console.error(`Error fetching technology by ID: ${error}`);
    return null;
  }
}

export async function getTechnologyByName(name: string) {
  try {
    const data = await prisma.technology.findFirst({
      where: { name },
    });
    return convertToPlainObject(data);
  } catch (error) {
    console.error(`Error fetching technology by name: ${error}`);
    return null;
  }
}
