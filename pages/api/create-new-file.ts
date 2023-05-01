import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await req.body;
  const parsedBody = JSON.parse(body);

  const { url, key } = parsedBody;

  const file = await db
    .insertInto("File")
    .values({
      key,
      url,
    })
    .execute();
  console.log(file);

  if (!file) {
    return NextResponse.error();
  }

  return res.status(200).json({ name: "John Doe" });
}
