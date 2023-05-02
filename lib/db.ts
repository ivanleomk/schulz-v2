import { DB } from "@/src/types/database";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { PrismaClient } from "@prisma/client";

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  }),
});

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const prismadb = prisma;
