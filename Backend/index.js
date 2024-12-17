import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});
import productRoute from "./routes/product.route.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(urlencoded({ extended: true, limit: "10mb" }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v2/products", productRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`server listen at port ${PORT}`);
});