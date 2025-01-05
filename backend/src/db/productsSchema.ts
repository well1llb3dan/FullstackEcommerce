import { integer, pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
  category: text("category"),
  brand: text("brand"),
  style: text("style"),
  description: text(),
  image: text(),
  strains: jsonb("strains").notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at").notNull().defaultNow(),
});
