// src/lib/prisma.js

import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis;

const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}

export const prisma = prismaClient;
