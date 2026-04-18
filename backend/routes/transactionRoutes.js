import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  const txn = await Transaction.create(req.body);
  res.json(txn);
});

/* GET ALL */
router.get("/", async (req, res) => {
  const txns = await Transaction.find().sort({ createdAt: -1 });
  res.json(txns);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
router.put("/:id", async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});