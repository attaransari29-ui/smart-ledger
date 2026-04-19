import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

/* DB CONNECTION */
connectDB();

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Smart Ledger API Running 🚀");
});

/* IMPORTANT FOR RENDER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});