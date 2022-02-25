import prisma from "./singletons/prisma";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

export type Context = {
  req: any;
  res: any;
  user: any | null;
  prisma: PrismaClient;
};

export async function createContext(
  req: any,
  res: any
): Promise<Context> {
  return {
    req: res,
    res: req,
    user: extractUserFromToken(req?.req?.cookies?.jwt, req?.req?.headers?.jwt), 
    prisma,
  };
}
export const extractUserFromToken = (
  rawCookieToken: string,
  rawHeaderToken: string
): any | null => {
  if (!rawHeaderToken && !rawCookieToken) return null;
  return jwt.verify(
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
};
