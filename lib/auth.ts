import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { Client } from "postmark";
import { prismadb as db } from "@/lib/db";
import { env } from "@/env.mjs";
import { PrismaClient } from "@prisma/client";

const postmarkClient = new Client(env.POSTMARK_API_TOKEN);
const prismaClient = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(prismaClient),
  session: {
    strategy: "jwt",
  },
  providers: [
    true
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
          sendVerificationRequest: async ({ identifier, url, provider }) => {
            const result = await postmarkClient.sendEmailWithTemplate({
              TemplateId: 31612989,
              To: identifier,
              From: "hello@ivanleo.com",
              TemplateModel: {
                url,
              },
              Headers: [
                {
                  // Set this to prevent Gmail from threading emails.
                  // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
                  Name: "X-Entity-Ref-ID",
                  Value: new Date().getTime() + "",
                },
              ],
            });

            if (result.ErrorCode) {
              throw new Error(result.Message);
            }
          },
        }),
  ],
  pages: true
    ? {}
    : {
        signIn: "/auth/signin",
        verifyRequest: "/auth/success-signin",
        newUser: "/dashboard",
      },
};
