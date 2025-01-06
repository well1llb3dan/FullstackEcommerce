import { integer, pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

// Define valid product categories
export type ProductCategory = "flower" | "wax" | "vape" | "edible";

// Category-specific validation functions
export const validateProduct = (data: {
  category: ProductCategory;
  brand?: string;
  style?: string;
}) => {
  if (data.category === "flower") {
    return true; // Allow missing brand and style
  }
  return !!data.brand && !!data.style; // Require brand and style for other categories
};

export const productsTable = pgTable("products", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
  category: text("category").notNull().$type<ProductCategory>(),
  brand: text("brand"), // Optional for flower
  style: text("style"), // Optional for flower
  description: text(),
  image: text(),
  strains: jsonb("strains").notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at").notNull().defaultNow(),
});
