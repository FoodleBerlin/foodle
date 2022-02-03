import prisma from "./singletons/prisma";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export type Context = {
  req: any;
  res: any;
  user: any | null;
  prisma: PrismaClient;
};

export async function createContext(
  req: Request,
  res: Response
): Promise<Context> {
  return {
    req: res,
    res: req,
    user: null, // TODO get is from req.cookies.jwt,
    prisma,
  };
}
