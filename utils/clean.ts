import prisma from "../server/singletons/prisma";
export async function clean() {
  try {
    await prisma.$executeRaw`DELETE FROM "User";`;
  } catch (e) {}
}
