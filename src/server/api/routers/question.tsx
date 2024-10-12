// import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const questionsRouter = createTRPCRouter({
  getAllQuestions: publicProcedure.query(async () => {
    const questions = await db.query.questions.findMany();
    return questions ?? null;
  }),

  getOneQuestion: publicProcedure.query(async ({ ctx }) => {
    const question = await ctx.db.query.questions.findFirst();

    return question ?? null;
  }),
});
