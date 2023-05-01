import { DB } from "@/src/types/database";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  }),
});
