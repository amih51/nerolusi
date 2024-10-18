import NextAuth, { type DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { users } from "./db/schema";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session extends DefaultSession {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      const userData = await db
        .select()
        .from(users)
        .where(sql`${users.id} = ${user.id}`);

      if (userData.length > 0) session.user.role = userData[0]?.role ?? "user";
      return session;
    },
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //     user,
    //   },
    // }),
  },
});
