"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createProjectSchema } from "@/lib/validators";

export async function getAllProjects() {
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
  try {
    const existedProject = await prisma.project.findFirst({ where: { id } });
    if (!existedProject) throw new Error("Projet non trouvé");

    await prisma.project.delete({ where: { id } });
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
  console.log(data);

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
    }
    revalidatePath("/admin/projects");
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

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findFirst({
      where: { slug },
      include: {
        technologies: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!project) throw new Error("Aucun projet trouvé avec ce slug");
    return {
      success: true,
      data: project,
      message: "Chargement du projet réussi !",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `Error, ${error}`,
    };
  }
}
