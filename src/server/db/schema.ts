import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  pgEnum,
  time,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const userRelation = relations(users, ({ many }) => ({
  usersToClasses: many(usersToClasses),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const classes = pgTable("class", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const classRelation = relations(classes, ({ many }) => ({
  usersToClasses: many(usersToClasses),
}));

export const typeEnum = pgEnum("type", ["tryout", "drill"]);

export const packages = pgTable("package", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: typeEnum().notNull(),
  TOstart: timestamp("start"),
  TOend: timestamp("end"),
  TOduration: time("duration"),
  classId: integer("classId").references(() => classes.id, {
    onDelete: "cascade",
  }),
});

export const subtestEnum = pgEnum("subtest", [
  "pu",
  "ppu",
  "pbm",
  "pk",
  "lb",
  "pm",
]);

export const questionTypeEnum = pgEnum("question_type", ["essay", "mulChoice"]);

export const questions = pgTable("question", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  index: serial("index").notNull(),
  content: text("content").notNull(),
  subtest: subtestEnum().notNull(),
  type: questionTypeEnum().notNull(),
  score: integer("score").default(0),
  explanation: text("explanation"),
  correctAnswerId: text("correct_answer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  packageId: integer("packageId")
    .notNull()
    .references(() => packages.id, { onDelete: "cascade" }),
});

export const questionsRelation = relations(questions, ({ one }) => ({
  correctAnswer: one(answers, {
    fields: [questions.correctAnswerId],
    references: [answers.id],
    relationName: "correctAnswer",
  }),
}));

export const answers = pgTable("answer", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  index: serial("index").notNull(),
  content: text("content").notNull(),
  questionId: text("questionId")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
});

export const userAnswers = pgTable(
  "user_answer",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    answerId: text("answerId").references(() => answers.id, {
      onDelete: "cascade",
    }),
    answer: text("content").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.answerId] }),
  }),
);

export const videos = pgTable("video", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const files = pgTable("file", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
});

export const usersToClasses = pgTable(
  "users_to_classes",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    classId: integer("classId").references(() => classes.id, {
      onDelete: "cascade",
    }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.classId] }),
  }),
);

export const usersToClassesRelation = relations(usersToClasses, ({ one }) => ({
  user: one(users, {
    fields: [usersToClasses.userId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [usersToClasses.classId],
    references: [classes.id],
  }),
}));
