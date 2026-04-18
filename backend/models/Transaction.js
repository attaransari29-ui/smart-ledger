import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    type: String, // Income or Expense
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);