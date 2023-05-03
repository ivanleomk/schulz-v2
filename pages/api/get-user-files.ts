import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

export default async function handler(req: Request) {
  const body = await req.json();

  const { userId } = body;

  if (!userId) {
    return new Response(
      JSON.stringify({
        message: "Invalid Request",
      }),
      { status: 400 }
    );
  }

  const files = await db
    .selectFrom("File")
    .selectAll()
    .where("userId", "=", userId)
    .execute();

  return new Response(
    JSON.stringify({
      files,
    }),
    { status: 200 }
  );
}
