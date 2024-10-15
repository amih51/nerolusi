import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const packageRouter = createTRPCRouter({
  getAllPackages: protectedProcedure.query(async ({ ctx }) => {
    const packages = await ctx.db.query.packages.findMany();
    return packages ?? null;
  }),
});
