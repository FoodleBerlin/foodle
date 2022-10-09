import prisma from '../singletons/prisma';

export async function clean() {
  try {
    await prisma.$executeRaw`DELETE FROM "User";`;
  } catch (e) {
    throw new Error(`Unable to seed ${e}`);
  }
}
