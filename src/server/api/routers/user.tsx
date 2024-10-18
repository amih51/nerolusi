import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
      with: {
        usersToClasses: {
          with: {
            class: true,
          },
        },
      },
    });
    return users ?? null;
  }),

  updateRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(["user", "teacher", "admin"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          role: input.role,
        })
        .where(eq(users.id, users.id));
    }),
});
