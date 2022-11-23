import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import prisma from '../singletons/prisma';

export type Token = {
  user: {
    id: string;
    fullName: string;
    email: string;
    stripeId: string | null;
  };
};
export default async function forgeJWT(user: Pick<User, 'id' | 'fullName' | 'email' | 'stripeId'>) {
  const id = await prisma.user.findUnique({
    where: { id: user.id },
  });
  if (!id) throw new Error('No id found for test user');
  const tokenRaw: Token = {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      stripeId: user.stripeId,
    },
  };
  const token = jwt.sign(tokenRaw, process.env.SERVER_SECRET ?? '', {
    expiresIn: '1d',
  });
  return token;
}
