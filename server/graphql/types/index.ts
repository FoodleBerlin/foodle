import { enumType } from "nexus";
import { Frequency as PrismaFrequency } from '@prisma/client';
export const Frequency = enumType({name :"Frequency", members: Object.values(PrismaFrequency).map((f)=>f)})

export * from "./User";
export * from "./Error";
export * from "./Property";
export * from "./PropertySlot";
export * from "./GenericDaySlot";
export * from "./BookingSlot";
export * from "./Mutation";
export * from "./DateTime"