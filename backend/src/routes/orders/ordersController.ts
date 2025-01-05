import { Request, Response } from "express"; // Import the Request and Response types from express

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
} // Define the AuthenticatedRequest interface
import { db } from "../../db/index.js"; // Import the db object from the db module
import { ordersTable } from "../../db/ordersSchema.js"; // Import the ordersTable object from the ordersSchema module
import { usersTable } from "../../db/usersSchema.js"; // Import the usersTable object from the usersSchema module
import { eq } from "drizzle-orm"; // Import the eq function from drizzle-orm

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    res.json(orders);
  } catch (error) {
    console.error(error);
  }
}

export async function getOrdersByUserId(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.userId, userId));
    res.json(orders);
  } catch (error) {
    console.error(error);
  }
}

export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.userId); // Assuming req.user contains the authenticated user's information
    console.log(userId);

    const [order] = await db
      .insert(ordersTable)
      .values({
        userId: userId,
      })
      .returning();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    const { status } = req.body;

    if (!["pending", "ready", "complete"].includes(status)) {
      res.status(400).send("Invalid status");
      return;
    }

    const [order] = await db
      .update(ordersTable)
      .set({ status })
      .where(eq(ordersTable.id, orderId))
      .returning();

    if (!order) {
      res.status(404).send("Order not found");
      return;
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export async function deleteOrder(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error(error);
  }
}
