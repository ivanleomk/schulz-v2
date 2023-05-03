import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await req.body;
  const parsedBody = JSON.parse(body);

  const { url, key, userId } = parsedBody;

  const file = await db
    .insertInto("File")
    .values({
      key,
      url,
      userId,
    })
    .execute();

  if (!file) {
    res.status(400).json({ message: "Unable to write to file" });
  }

  res.status(200).json({ message: "Ok" });
}
