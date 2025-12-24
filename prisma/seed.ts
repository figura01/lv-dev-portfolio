import { PrismaClient } from "@prisma/client";

import { hash } from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  // Utilisez une valeur de hachage statique pour le test
  // Ceci est un hachage bcrypt valide pour le mot de passe "password123"
  const hashedPassword = await hash("admin1234", 12);
  console.log("hashedPassword:", hashedPassword);
  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      emailVerified: true,
      role: "ADMIN",
    },
  });
  console.log("User created:", user);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
