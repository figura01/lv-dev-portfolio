import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  console.log("Start seeding...");

  // Clear existing data except for the specified user if email is provided

  await prisma.project.deleteMany();

  if (!email) {
    // Delete users without auth relationships only if no email is specified
    await prisma.user.deleteMany({
      where: {
        accounts: {
          none: {},
        },
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "Admin",
        email: "testadmin@exemple.com",
        role: "ADMIN",
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    console.log("user created: ", user);

    const hashedPassword = bcrypt.hashSync("admin1234", 12);

    const userAccount = await prisma.account.create({
      data: {
        id: `${user.id}-credentials`,
        accountId: user.id,
        userId: user.id,
        password: hashedPassword,
        providerId: "credentials",
      },
    });

    if (userAccount) {
      console.log("Account created");
    }

    console.log("user created: ", user);
  } else {
    // If email is provided, find the user and create projects for them
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
