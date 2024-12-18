import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./utils/db.js";
dotenv.config({});
import productRoute from "./routes/product.route.js";

const PORT = process.env.PORT || 4000;

const app = express();

const _dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));

const corsOptions = {
  origin: "https://e-commerce-product-module.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v2/products", productRoute);

app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server listen at port ${PORT}`);
});
