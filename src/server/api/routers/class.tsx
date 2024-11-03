import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { classes } from "~/server/db/schema";

export const classRouter = createTRPCRouter({
  getAllClasses: protectedProcedure.query(async ({ ctx }) => {
    const classes = await ctx.db.query.classes.findMany();
    return classes ?? null;
  }),

  createClass: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Class name is required"),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newClass = await ctx.db.insert(classes).values({
        name: input.name,
      });
      return newClass;
    }),
});
