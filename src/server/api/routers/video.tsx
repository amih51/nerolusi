import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const videoRouter = createTRPCRouter({
  getAllvideos: protectedProcedure.query(async ({ ctx }) => {
    const videos = await ctx.db.query.videos.findMany();
    return videos ?? null;
  }),
});
