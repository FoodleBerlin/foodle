import prisma from "../server/singletons/prisma";
export async function seed() {
  const [users] = await Promise.all(
    await prisma.$transaction([
      prisma.user.createMany({
        data: [
          {
            email: "user1@gmail.com",
            handle: "user1",
            fullName: "User 1",
            role: "tenant",
            zip: 13000,
          },
          {
            email: "use2@gmail.com",
            handle: "user2",
            fullName: "User 2",
            role: "tenant",
            zip: 14000,
          },
          {
            email: "user3@gmail.com",
            handle: "user3",
            fullName: "User 3",
            role: "tenant",
            zip: 14000,
          },
          {
            email: "user4@gmail.com",
            handle: "user4",
            fullName: "User 4",
            role: "landlord",
            zip: 15000,
          },
          {
            email: "user5@gmail.com",
            handle: "user5",
            fullName: "User 5",
            role: "tenantLandlord",
            zip: 16000,
          },
        ],
      }),
    ])
  );
}
export default seed;
