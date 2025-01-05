import { pgTable, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";
import { productsTable } from "./productsSchema";

const timestampFields = {
  createdAt: timestamp().notNull().defaultNow(),
  modifiedAt: timestamp().notNull().defaultNow(),
};

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ...timestampFields,
  status: varchar({ length: 255 }).notNull().default("pending"),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .notNull()
    .references(() => ordersTable.id),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  quantity: integer().notNull(),
  price: integer().notNull(),
  ...timestampFields,
});
