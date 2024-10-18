// import { z } from "zod";

import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { questions } from "~/server/db/schema";

export const questionsRouter = createTRPCRouter({
  getAllQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.query.questions.findMany();
    return questions ?? null;
  }),

  getOneQuestion: publicProcedure.query(async ({ ctx }) => {
    const question = await ctx.db.query.questions.findFirst();
    return question ?? null;
  }),

  addQuestion: protectedProcedure
    .input(
      z.object({
        index: z.number().int().nonnegative(),
        content: z.string().min(1, "Content is required"),
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
        subtest,
        type,
        score: score ?? 0,
        correctAnswerId,
        explanation: explanation ?? "",
        packageId,
      });
    }),
});
