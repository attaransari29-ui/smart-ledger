import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const API = axios.create({
    baseURL: "http://192.168.0.109:5000/api",
  });

  API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.authorization = token;
    return req;
  });

  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dark, setDark] = useState(true);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data || []);
    } catch {
      setTransactions([]);
    }
  };

  const handleSave = async () => {
    if (!title || !amount) return alert("Fill all fields");

    if (isEdit) {
      const res = await API.put(`/transactions/${editId}`, {
        title,
        amount: Number(amount),
        type,
        category,
      });

      setTransactions((prev) =>
        prev.map((t) => (t._id === editId ? res.data : t))
      );
    } else {
      const res = await API.post("/transactions", {
        title,
        amount: Number(amount),
        type,
        category,
      });

      setTransactions((prev) => [res.data, ...prev]);
    }

    setShowModal(false);
    setIsEdit(false);
    setTitle("");
    setAmount("");
  };

  const handleDelete = async (id) => {
    await API.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  const handleEdit = (t) => {
    setTitle(t.title);
    setAmount(t.amount);
    setType(t.type);
    setCategory(t.category);
    setEditId(t._id);
    setIsEdit(true);
    setShowModal(true);
  };

  const filteredTxns = transactions.filter(
    (t) => new Date(t.createdAt).getMonth() === selectedMonth
  );

  const income = filteredTxns
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = filteredTxns
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = income - expense;

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const categories = ["Food", "Travel", "Bills", "Shopping"];

  const categoryData = categories.map((cat) => ({
    name: cat,
    amount: filteredTxns
      .filter((t) => (t.category || "").toLowerCase() === cat.toLowerCase())
      .reduce((a, b) => a + Number(b.amount), 0),
  }));

 const exportPDF = () => {
  const doc = new jsPDF();

  /* ===== HEADER ===== */
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 30, "F");

  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("SMART LEDGER", 14, 18);

  doc.setFontSize(10);
  doc.text("Personal Finance Statement", 14, 24);

  /* ===== DATE ===== */
  doc.setTextColor(100);
  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    150,
    20
  );

  /* ===== MONTH TITLE ===== */
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(
    `Statement - ${new Date(0, selectedMonth).toLocaleString("default", {
      month: "long",
    })}`,
    14,
    40
  );

  /* ===== SUMMARY BOX ===== */
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 45, 180, 30, 5, 5, "F");

  doc.setFontSize(11);
  doc.setTextColor(0);

  doc.text(`Balance: ₹${balance}`, 20, 58);
  doc.setTextColor(34, 197, 94);
  doc.text(`Income: ₹${income}`, 80, 58);
  doc.setTextColor(239, 68, 68);
  doc.text(`Expense: ₹${expense}`, 140, 58);

  /* ===== TABLE DATA ===== */
  const tableData = filteredTxns.map((t) => [
    t.title,
    t.category,
    t.type,
    `₹${t.amount}`,
    new Date(t.createdAt).toLocaleDateString(),
  ]);

  /* ===== TABLE ===== */
  autoTable(doc, {
    startY: 85,
    head: [["Title", "Category", "Type", "Amount", "Date"]],
    body: tableData,

    styles: {
      fontSize: 10,
      cellPadding: 4,
    },

    headStyles: {
      fillColor: [14, 165, 233],
      textColor: 255,
    },

    didParseCell: function (data) {
      if (data.section === "body" && data.column.index === 3) {
        const row = filteredTxns[data.row.index];
        if (row.type === "Income") {
          data.cell.styles.textColor = [34, 197, 94];
        } else {
          data.cell.styles.textColor = [239, 68, 68];
        }
      }
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  /* ===== CHART (BAR VISUAL) ===== */
  const chartStartY = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Category Analysis", 14, chartStartY);

  let x = 20;
  const max = Math.max(...categoryData.map((c) => c.amount), 1);

  categoryData.forEach((c) => {
    const barHeight = (c.amount / max) * 30;

    doc.setFillColor(56, 189, 248);
    doc.rect(x, chartStartY + 10, 10, -barHeight, "F");

    doc.setFontSize(8);
    doc.text(c.name, x, chartStartY + 15);

    x += 25;
  });

  /* ===== FOOTER ===== */
  const pageHeight = doc.internal.pageSize.height;

  doc.setDrawColor(200);
  doc.line(14, pageHeight - 20, 196, pageHeight - 20);

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(
    "Smart Ledger • Confidential Financial Report",
    14,
    pageHeight - 10
  );

  /* SAVE */
  doc.save("SmartLedger_Bank_Statement.pdf");
};

  const container = {
    display: "flex",
    minHeight: "100vh",
    background: dark
      ? "linear-gradient(135deg,#0f172a,#020617)"
      : "#f1f5f9",
    color: dark ? "white" : "black",
  };

  return (
    <div style={container}>
      <div style={glow}></div>

      <div style={sidebar}>
        <h2>💰 Ledger</h2>

        <button style={btn} onClick={() => setDark(!dark)}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        <button
          style={btn}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <div style={main}>
        <h2>Dashboard</h2>

        <select
          style={input}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", {
                month: "long",
              })}
            </option>
          ))}
        </select>

        <div style={cardRow}>
          {[{ title: "Balance", value: balance },
            { title: "Income", value: income },
            { title: "Expense", value: expense }
          ].map((c, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} style={card}>
              <p>{c.title}</p>
              <h3>₹{c.value}</h3>
            </motion.div>
          ))}
        </div>

        <div style={chartRow}>
          <motion.div style={chartBox} whileHover={{ scale: 1.02 }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value">
                  <Cell fill="#22c55e" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div style={chartBox} whileHover={{ scale: 1.02 }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button style={primaryBtn} onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>

          <button style={secondaryBtn} onClick={exportPDF}>
            Export PDF
          </button>
        </div>

        {/* 🔥 PREMIUM TRANSACTION UI */}
        {filteredTxns.map((t) => (
          <motion.div key={t._id} style={transaction} whileHover={{ scale: 1.02 }}>
            <div>
              <p style={titleStyle}>{t.title}</p>
              <span style={categoryStyle}>{t.category}</span>
            </div>

            <div style={rightSide}>
              <span
                style={{
                  ...amountStyle,
                  color: t.type === "Income" ? "#22c55e" : "#ef4444",
                }}
              >
                ₹{t.amount}
              </span>

              <button style={iconBtn} onClick={() => handleEdit(t)}>
                <Pencil size={16} />
              </button>

              <button style={deleteIconBtn} onClick={() => handleDelete(t._id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}

        {showModal && (
          <div style={overlay}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={modal}>
              <h3>{isEdit ? "Edit" : "Add"} Transaction</h3>

              <input style={input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input style={input} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

              <select style={input} value={type} onChange={(e) => setType(e.target.value)}>
                <option>Income</option>
                <option>Expense</option>
              </select>

              <select style={input} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Food</option>
                <option>Travel</option>
                <option>Bills</option>
                <option>Shopping</option>
              </select>

              <button style={primaryBtn} onClick={handleSave}>
                Save
              </button>

              <button style={secondaryBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

/* NEW STYLES */
const titleStyle = { fontWeight: "500", fontSize: "14px" };
const categoryStyle = { fontSize: "12px", opacity: 0.6 };
const rightSide = { display: "flex", alignItems: "center", gap: "10px" };
const amountStyle = { fontWeight: "bold" };

const iconBtn = {
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  border: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  cursor: "pointer",
};

const deleteIconBtn = {
  ...iconBtn,
  background: "rgba(239,68,68,0.2)",
  color: "#ef4444",
};

/* KEEP YOUR OLD STYLES BELOW (no change) */
const glow = { position: "fixed", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(14,165,233,0.3), transparent)", top: "-100px", left: "-100px", filter: "blur(100px)", pointerEvents: "none" };
const sidebar = { width: "220px", padding: "20px" };
const main = { flex: 1, padding: "30px" };
const cardRow = { display: "flex", gap: "20px", marginTop: "20px" };
const card = { padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.1)" };
const chartRow = { display: "flex", gap: "20px", marginTop: "30px" };
const chartBox = { flex: 1, padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.1)" };
const primaryBtn = { padding: "10px 15px", background: "#0ea5e9", border: "none", borderRadius: "8px", marginRight: "10px", cursor: "pointer" };
const secondaryBtn = { padding: "10px 15px", background: "#64748b", border: "none", borderRadius: "8px", cursor: "pointer" };
const transaction = { display: "flex", justifyContent: "space-between", padding: "10px", marginTop: "10px", background: "rgba(255,255,255,0.08)" };
const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center" };
const modal = { background: "#1e293b", padding: "20px", borderRadius: "12px", width: "300px" };
const input = { width: "100%", padding: "10px", margin: "10px 0" };
const btn = { marginTop: "10px" };