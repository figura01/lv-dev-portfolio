// scripts/create-admin.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin1234", 12);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: password,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
