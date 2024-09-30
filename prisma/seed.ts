// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: "Administrator",
      email: "admin@example.com",
      password: "1234567",
    },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`User dengan email ${user.email} sudah ada. Lewati.`);
      continue;
    }

    const hashedPassword = await hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    console.log(`User ${user.email} berhasil dibuat.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
