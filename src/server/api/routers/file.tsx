import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const fileRouter = createTRPCRouter({
  getAllFiles: protectedProcedure.query(async ({ ctx }) => {
    const files = await ctx.db.query.files.findMany();
    return files ?? null;
  }),
});
