import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController.js";

import { verifyToken, verifyManager } from "../../middleware/authMiddleware.js";

// Product Routes
const router = Router();

router.get("/", verifyToken, listProducts);
router.get("/:id", verifyToken, getProductById);
router.post("/", verifyToken, verifyManager, createProduct);
router.put("/:id", verifyToken, verifyManager, updateProduct);
router.delete("/:id", verifyToken, verifyManager, deleteProduct);

export default router;
