import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { answers, questions } from "~/server/db/schema";

export const answerRouter = createTRPCRouter({
  getAnswer: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(answers)
        .where(eq(answers.questionId, input.questionId))
        .orderBy(answers.index);
    }),

  createAnswer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        questionId: z.string(),
        content: z.string(),
        index: z.number(),
        isCorrect: z.boolean().optional().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const answerId = await ctx.db
        .insert(answers)
        .values({
          questionId: input.questionId,
          content: input.content,
        })
        .returning({ id: answers.id });

      if (input.isCorrect) {
        await ctx.db
          .update(questions)
          .set({ correctAnswerId: answerId[0]?.id })
          .where(eq(questions.id, input.questionId));
      }

      return answerId;
    }),

  updateAnswer: protectedProcedure
    .input(
      z.object({
        answerId: z.string(),
        content: z.string(),
        index: z.number(),
        isCorrect: z.boolean().optional().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(answers)
        .set({ content: input.content })
        .where(eq(answers.id, input.answerId));

      if (input.isCorrect) {
        const answer = await ctx.db
          .select({ questionId: answers.questionId })
          .from(answers)
          .where(eq(answers.id, input.answerId));

        if (answer) {
          await ctx.db
            .update(questions)
            .set({ correctAnswerId: input.answerId })
            .where(eq(questions.id, answers.questionId));
        }
      }

      return { success: true };
    }),
});
