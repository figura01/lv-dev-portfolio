"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/data/public";
import { requireAdmin } from "@/lib/auth/session";
import { createProjectSchema } from "@/lib/validators";

export async function getAllProjects() {
  await requireAdmin();
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        technologies: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!projects) throw new Error("Pad de projets trouvés");

    return {
      success: true,
      data: projects,
      message: "Liste des projets chargée",
    };
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
    };
  }
}

export async function getOneProjectById(id: string) {
  await requireAdmin();
  try {
    const project = await prisma.project.findFirst({
      where: { id },
      include: {
        technologies: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!project) throw new Error("Aucun projet touvé avec cette Id");

    return {
      success: true,
      data: project,
      message: "Chargement du projet réussi !",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: ``,
    };
  }
}

export async function deleteProject(id: string) {
  await requireAdmin();
  try {
    const existedProject = await prisma.project.findFirst({ where: { id } });

    if (!existedProject) throw new Error("Projet non trouvé");

    console.log("existedProject: ", existedProject);

    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidateTag(CACHE_TAGS.projects);

    return {
      success: true,
      message: `Le projet id: ${id} title: ${existedProject.title} a bien été supprimé`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Erreur: ${error}`,
    };
  }
}

export async function createProject(data: z.infer<typeof createProjectSchema>) {
  await requireAdmin();
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
        technologies: {
          connect: data.technologies?.map((id) => ({ id })) || [],
        },
      },
    });
    if (!project) {
      throw new Error("Le projet n'a pas pu être créé");
    }
    revalidatePath("/admin/projects");
    revalidateTag(CACHE_TAGS.projects);
    return {
      success: true,
      data: project,
      message: "Le projet a bien été créer",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}

export async function updateProject(
  project: z.infer<typeof createProjectSchema>,
  projectId: string
) {
  await requireAdmin();
  try {
    const updatedProject = prisma.project.findFirst({
      where: { id: projectId },
    });

    if (!updatedProject) throw new Error("Pas de projet existant");

    await prisma.project.update({
      where: { id: projectId },
      data: {
        ...project,
        technologies: {
          set: project.technologies.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/admin/projects");

    revalidateTag(CACHE_TAGS.projects);
    return {
      success: true,
      data: updatedProject,
      message: "Le projet a bien été modifié",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}

