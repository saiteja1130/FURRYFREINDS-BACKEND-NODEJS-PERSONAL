import express from "express";
import { connectDB } from "./Configs/dbConfig.js";
import dotenv from "dotenv";
import UserRoutes from "./Routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "HELLO IM RUNNING",
  });
});

app.use("/user", UserRoutes)

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
