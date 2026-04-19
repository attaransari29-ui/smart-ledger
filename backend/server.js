import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== DB CONNECT ===== */
connectDB();

/* ===== API ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Smart Ledger API Running 🚀");
});

/* ===== SERVE FRONTEND (OPTIONAL BUT BEST) ===== */
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

/* ===== PORT ===== */
const PORT = process.env.PORT || 5000;

/* ===== START SERVER ===== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});