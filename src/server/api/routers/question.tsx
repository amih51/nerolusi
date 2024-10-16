// import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const questionsRouter = createTRPCRouter({
  getAllQuestions: publicProcedure.query(async () => {
    await db.query.questions.findMany();
  }),
});
