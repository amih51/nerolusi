import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { videos } from "~/server/db/schema";

export const videoRouter = createTRPCRouter({
  getAllvideos: protectedProcedure.query(async ({ ctx }) => {
    const videos = await ctx.db.query.videos.findMany();
    return videos ?? null;
  }),

  addVideo: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        url: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(videos).values({
        title: input.title,
        description: input.description,
        url: input.url,
        createdAt: new Date(),
      });
    }),
});
