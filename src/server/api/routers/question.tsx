import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { questions } from "~/server/db/schema";

export const questionsRouter = createTRPCRouter({
  getOneQuestions: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const questionsData = await ctx.db
        .select()
        .from(questions)
        .where(eq(questions.id, input.id));

      return questionsData[0];
    }),

  getAllQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.query.questions.findMany();
    return questions ?? null;
  }),

  addQuestion: protectedProcedure
    .input(
      z.object({
        index: z.number().int().nonnegative(),
        content: z.string().min(1, "Content is required"),
        imageUrl: z.string().optional(),
        subtest: z.enum(["pu", "ppu", "pbm", "pk", "lb", "pm"]),
        type: z.enum(["essay", "mulChoice"]),
        score: z.number().optional(),
        correctAnswerId: z.string().optional(),
        explanation: z.string().optional(),
        packageId: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        index,
        content,
        imageUrl,
        subtest,
        type,
        score,
        correctAnswerId,
        explanation,
        packageId,
      } = input;
      await ctx.db.insert(questions).values({
        index,
        content,
        imageUrl,
        subtest,
        type,
        score: score ?? 0,
        correctAnswerId,
        explanation: explanation ?? "",
        packageId,
      });
    }),
});
