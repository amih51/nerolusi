// import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getAllQuestions: protectedProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.query.questions.findMany();
    return questions ?? null;
  }),

  getOneQuestion: publicProcedure.query(async ({ ctx }) => {
    const question = await ctx.db.query.questions.findFirst();
    return question ?? null;
  }),
});
