import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Token } from '~/utils/forgeJWT';
import prisma from './singletons/prisma';
import StripeWrapper from './singletons/stripe/endpoints';
export type Context = {
  req: any;
  res: any;
  user: Token['user'] | null;
  prisma: PrismaClient;
  // Must be optional and not passed in manually or apollo server will error
  //https://github.com/apollographql/apollo-server/blob/6954aff9b56bbb8eb0b60928df2c3e8a7941b459/packages/apollo-server-core/src/requestPipeline.ts#L104
  dataSources?: Record<'stripeWrapper', StripeWrapper>;
};

const testUser = {
  id: '1',
  fullName: 'testUser',
  email: 'testMail',
  stripeId: 'testStripeId',
};

export async function createContext(req: any, res: any): Promise<Context> {
  return {
    req: res,
    res: req,
    user:
      process.env.ENVIRONMENT == 'dev'
        ? testUser
        : extractUserFromToken(req?.req?.cookies?.jwt, req?.req?.headers?.jwt),
    prisma,
  };
}
export const extractUserFromToken = (rawCookieToken: string | null, rawHeaderToken: string): Token['user'] | null => {
  if (!rawHeaderToken && !rawCookieToken) return null;
  const decoded = jwt.verify(
    rawCookieToken ?? rawHeaderToken,
    process.env.SERVER_SECRET ?? '',
    (err: any, data: any) => {
      if (!err && data.user.id) {
        return data.user;
      } else {
        return null;
      }
    }
  );
  // JWT verify lib functionr returns void
  return decoded as unknown as Token['user'];
};
