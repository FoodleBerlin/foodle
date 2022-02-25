import { User } from '.prisma/client';
import jwt from 'jsonwebtoken';
import prisma from '../server/singletons/prisma';

export default async function forgeJWT(user: User) {
  
  console.log("ooooozer:" + user);
  const id = await prisma.user.findUnique({
    where: { id: user.id },
  });
  if (!id) throw new Error('No id found for test user');
  const token = jwt.sign(
    {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    },
    process.env.SERVER_SECRET ?? '',
    {
      expiresIn: '1d',
    }
  );
  return token;
}