import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"; // Import the necessary functions from drizzle-orm/pg-core

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at").notNull().defaultNow(),
}); // Define the users table schema
