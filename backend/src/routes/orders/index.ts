import { Router } from "express"; // Import the Router class
import {
  listOrders,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
} from "./ordersController.js"; // Import the controller functions
import { verifyToken } from "../../middleware/authMiddleware.js"; // Import the verifyToken middleware
import { verifyManager } from "../../middleware/authMiddleware.js"; // Import the verifyManager middleware

const router = Router(); // Create a new router

router.get("/", verifyToken, verifyManager, listOrders); // Only managers can list all orders
router.get("/:id", verifyToken, getOrdersByUserId); // Users can only get their own orders
router.post("/", verifyToken, createOrder); // Only authenticated users can create orders
router.put("/:id", verifyToken, verifyManager, updateOrder); // Only managers can update orders
router.delete("/:id", verifyToken, verifyManager, deleteOrder); // Only managers can delete orders

export default router; // Export the router
