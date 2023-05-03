import { z } from "zod";

export const fileSchema = z.array(
  z.object({
    id: z.number().gt(0),
    key: z.string(),
    url: z.string().url(),
    isProcessing: z
      .number()
      .transform((val) => Boolean(val))
      .pipe(z.boolean()),
    startedprocessing: z.string().datetime(),
    isTranscribed: z
      .number()
      .transform((val) => Boolean(val))
      .pipe(z.boolean()),
    transcript: z.string().nullable(),
    userId: z.string(),
  })
);

export type fileType = z.infer<typeof fileSchema>;
