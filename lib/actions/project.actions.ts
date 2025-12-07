// lib/actions/project.actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProjectFormData } from "@/types";
import { updateProjectSchema } from "@/lib/validators";
import { formatError } from "../utils";
import { z } from "zod";

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findFirst({
    where: { slug },
    include: {
      technologies: true,
    },
  });

  if (!project) {
    notFound();
  }

  return project;
}

export async function getAllProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      image: true,
      createdAt: true,
      technologies: true,
      description: true,
    },
  });
}

export async function getProjectSlugs() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function createProject(data: ProjectFormData) {
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
        technologies: {
          connect: data.technologies?.map((id) => ({ id })) || [],
        },
      },
    });
    revalidatePath("/admin/projets");
    return { success: true, data: project, message: "Projet créé avec succès" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateProject(data: z.infer<typeof updateProjectSchema>) {
  try {
    const project = updateProjectSchema.parse(data);
    const projectExisted = await prisma.project.findFirst({
      where: { id: project.id },
    });

    if (!projectExisted) throw new Error("Le projet n'existe pas");

    await prisma.project.update({
      where: { id: project.id },
      data: {
        ...project,
        technologies: {
          set: project.technologies.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/admin/projets");
    return {
      success: true,
      message: "Projet mis à jour avec succès",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin/projets");
    return {
      success: true,
      message: "Projet supprimé avec succès",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
