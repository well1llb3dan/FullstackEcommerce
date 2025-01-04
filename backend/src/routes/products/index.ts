import { Router } from "express";

// Product Routes
const router = Router();

router.get("/", (req, res) => {
  res.send("List of Products.");
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

router.post("/", (req, res) => {
  res.send("Created a new product.");
});

export default router;
