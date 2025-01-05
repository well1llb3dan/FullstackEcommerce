import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { usersTable } from "../../db/usersSchema";
import bcrypt from "bcryptjs";
import { db } from "../../db"; // Ensure you have the correct path to your db module
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();
router.use(bodyParser.json()); // Add this line to use body-parser middleware

router.post("/register", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({ ...data, password: hashedPassword })
      .returning(); // Assuming you want to return the inserted user

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Failed to register");
  }
});

router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id); // Convert id to number
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const modifiedAt = new Date(); // Get the current date and time

    const [updatedUser] = await db
      .update(usersTable)
      .set({ password: hashedPassword, modifiedAt })
      .where(eq(usersTable.id, userId))
      .returning(); // Assuming you want to return the updated user

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send("Failed to update password");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).send("Invalid email or password");
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).send("Invalid email or password");
      return;
    }

    // create a JWT token and send it to the client
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.SECRET_KEY as string,
      { expiresIn: "1h" }
    );
    res.json({ token, user });
    console.log(email, password);
  } catch (error) {
    res.status(500).send("Failed to login");
  }
});

export default router;
