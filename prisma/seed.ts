import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@admin",
      password: "admin",
      type: "admin",
    },
  });
  console.log("Seeder User ....");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
