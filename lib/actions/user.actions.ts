// Module serveur uniquement : PAS de "use server" ici.
// Ces fonctions renvoient des hash de mots de passe et ne doivent jamais être
// exposées comme server actions appelables depuis le navigateur.

import { prisma } from "@/lib/prisma";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    if (!users) throw new Error("Pad de users trouvés");

    return {
      success: true,
      data: users,
      message: "Liste des users chargée",
    };
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
    };
  }
}

export async function getOneUserByEmail(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw new Error("Aucun user touvé avec cet email");

    return {
      success: true,
      data: user,
      message: "Chargement du user réussi !",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: `${error}`,
    };
  }
}
