import Transaction from "../models/Transaction.js";

// ✅ CREATE
export const createTransaction = async (req, res) => {
  try {
    const t = await Transaction.create({
      ...req.body,
      userId: req.user.id,
    });
    res.json(t);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL
export const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE
export const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE
export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};