import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";

const port = 3000;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
