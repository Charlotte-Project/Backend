import { PrismaClient } from '@prisma/client';
import { categories } from './data';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE "categories_id_seq" RESTART WITH 1`;

  await prisma.category.createMany({
    data: categories,
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
