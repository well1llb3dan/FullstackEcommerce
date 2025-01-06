import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductImage,
} from "./productsController.js";
import { verifyToken, verifyManager } from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, listProducts); // Only authenticated users can list all products
router.get("/:id", verifyToken, getProductById); // Only authenticated users can get a product by id
router.post("/", verifyToken, verifyManager, createProduct); // Only managers can create products
router.put("/:id", verifyToken, verifyManager, updateProduct); // Only managers can update products
router.delete("/:id", verifyToken, verifyManager, deleteProduct); // Only managers can delete products
router.get("/image/:id", getProductImage);

export default router;
