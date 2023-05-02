import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { Client } from "postmark";

const prisma = new PrismaClient();

const devConfig = EmailProvider({
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
});

const prodConfig = EmailProvider({
  server: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  from: process.env.SMTP_FROM,
  sendVerificationRequest: async ({ identifier, url, provider }) => {
    const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN);

    const result = await postmarkClient.sendEmailWithTemplate({
      TemplateId: 31612989,
      To: identifier,
      From: provider.from,
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
});

const emailConfig = process.env.VERCEL_ENV ? devConfig : prodConfig;

export default NextAuth({
  providers: [emailConfig],
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
});
