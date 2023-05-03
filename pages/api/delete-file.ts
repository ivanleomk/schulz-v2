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

  const baseUrl = process.env.BACKEND_SERVICE;
  const jwtToken = process.env.SECRET_JWT_KEY;
  if (!baseUrl || !jwtToken) {
    return new Response(
      JSON.stringify({
        message: "BACKEND URL not configured correctly",
      }),
      { status: 400 }
    );
  }

  try {
    const url = `${baseUrl}/delete-file`;
    console.log(url);
    // We get our container to delete from S3
    const res = await fetch(`${baseUrl}/delete-file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        key: fileId,
      }),
    });

    console.log(res);

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
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: "Unable to delete file",
      }),
      { status: 400 }
    );
  }
}
