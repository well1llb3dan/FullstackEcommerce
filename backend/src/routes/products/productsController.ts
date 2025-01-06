import { Request, Response } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { db } from "../../db/index";
import { productsTable } from "../../db/productsSchema.js";
import { eq } from "drizzle-orm";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const listProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send("Failed to list products");
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send("Failed to get product by id");
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).send("Failed to create product");
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Failed to update products");
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Failed to delete products");
  }
};

export const getProductImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Request received to get product image");
    const { id } = req.params;
    console.log(`Product ID: ${id}`);
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product || !product.image) {
      console.log("Image not found for the product");
      res.status(404).send("Image not found");
      return;
    }

    const imagePath = path.join(
      __dirname,
      "../../public/images/products",
      product.image
    );
    console.log(`Image path: ${imagePath}`);
    if (fs.existsSync(imagePath)) {
      console.log("Image file found, sending file");
      res.sendFile(imagePath);
    } else {
      console.log("Image file not found on disk");
      res.status(404).send("Image file not found");
    }
  } catch (error) {
    console.error("Error occurred while getting product image:", error);
    res.status(500).send("Failed to get product image");
  }
};
