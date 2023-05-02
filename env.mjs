import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    POSTMARK_API_TOKEN: z.string().min(1),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.string().min(1),
    SMTP_USER: z.string().min(1),
    SMTP_PASSWORD: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    S3_UPLOAD_KEY: z.string().min(1),
    S3_UPLOAD_SECRET: z.string().min(1),
    S3_UPLOAD_BUCKET: z.string().min(1),
    S3_UPLOAD_REGION: z.string().min(1),
    USERNAME: z.string().min(1),
    PASSWORD: z.string().min(1),
    HOST: z.string().min(1),
  },
  client: {
    // NEXT_PUBLIC_APP_URL: z.string().min(1),
    //TODO: Look at this article more closely -> https://andreaskeller.name/blog/nextjs-passwordless-email-auth
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,

    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    HOST: process.env.HOST,
  },
});
