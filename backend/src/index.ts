import express, { Router } from "express";
import productsRoutes from "./routes/products/index";

const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

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

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
