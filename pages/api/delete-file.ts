import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";

export default async function handler(req: Request) {
  const body = await req.json();

  const { fileId } = body;

  if (!fileId) {
    return new Response(
      JSON.stringify({
        message: "Invalid Request",
      }),
      { status: 400 }
    );
  }

  const file = await db
    .updateTable("File")
    .set({ deleted: 1 })
    .where("id", "=", fileId)
    .execute();

  return new Response(
    JSON.stringify({
      file,
    }),
    { status: 200 }
  );
}
