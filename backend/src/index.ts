import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bodyParser from "body-parser";
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(json());
app.use("/images", express.static(join(__dirname, "../public/images")));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
