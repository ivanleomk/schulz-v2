import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { Client } from "postmark";
import { prismadb as db } from "@/lib/db";
import { env } from "@/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";

const postmarkClient = new Client(env.POSTMARK_API_TOKEN);

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize() {
            return {
              id: "1",
              name: "J Smith",
              email: "jsmith@example.com",
              image: "https://i.pravatar.cc/150?u=jsmith@example.com",
            };
          },
        })
      : EmailProvider({
          server: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
          },
          from: process.env.SMTP_FROM,
        }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/success-signin",
    newUser: "/dashboard",
  },
};
