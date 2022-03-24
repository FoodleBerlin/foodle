import prisma from '../server/singletons/prisma';
export async function clean() {
  try {
    await prisma.$executeRaw`DELETE FROM "PropertySlot";`;
    await prisma.$executeRaw`DELETE FROM "Property";`;
    await prisma.$executeRaw`DELETE FROM "User";`;
  } catch (e) {
    throw new Error(`Unable to seed ${e}`);
  }
}
