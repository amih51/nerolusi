import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const classRouter = createTRPCRouter({
  getAllClasses: protectedProcedure.query(async ({ ctx }) => {
    const classes = await ctx.db.query.classes.findMany();
    return classes ?? null;
  }),
});
