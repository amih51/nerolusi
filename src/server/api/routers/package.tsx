import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { packages, questions } from "~/server/db/schema";

export const packageRouter = createTRPCRouter({
  getOnePackage: protectedProcedure
    .input(
      z.object({
        packageId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const packageData = await ctx.db
        .select()
        .from(packages)
        .where(eq(packages.id, Number(input.packageId)));

      const questionsData = await ctx.db
        .select()
        .from(questions)
        .where(eq(questions.packageId, Number(input.packageId)));

      return {
        ...packageData[0],
        questions: questionsData,
      };
    }),

  getAllPackages: protectedProcedure.query(async ({ ctx }) => {
    const packages = await ctx.db.query.packages.findMany();
    return packages ?? null;
  }),

  createPackage: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Package name is required"),
        type: z.enum(["tryout", "drill"]),
        start: z.date().optional(),
        end: z.date().optional(),
        duration: z.string().optional(),
        classId: z.number().int().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, type, start, end, duration, classId } = input;

      const newPackage = await ctx.db.insert(packages).values({
        name,
        type,
        TOstart: start ?? null,
        TOend: end ?? null,
        TOduration: duration ? duration : null,
        classId: classId ?? null,
      });

      return newPackage;
    }),
});
