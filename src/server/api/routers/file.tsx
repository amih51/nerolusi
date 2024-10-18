import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { files } from "~/server/db/schema";

export const fileRouter = createTRPCRouter({
  getAllFiles: protectedProcedure.query(async ({ ctx }) => {
    const files = await ctx.db.query.files.findMany();
    return files ?? null;
  }),

  uploadFile: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        url: z.string().url(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(files).values({
        title: input.title,
        description: input.description,
        url: input.url,
      });

      return result;
    }),
});
