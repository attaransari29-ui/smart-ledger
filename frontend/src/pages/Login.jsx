import { useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields");

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={container}>
      {/* GLOW BACKGROUND */}
      <div style={glow}></div>

      {/* CENTER */}
      <div style={center}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={card}
        >
          <h2 style={title}>💰 Smart Ledger</h2>
          <p style={subtitle}>Manage your finances smartly</p>

          {/* EMAIL */}
          <div style={field}>
            <input
              style={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label style={label}>Email</label>
          </div>

          {/* PASSWORD */}
          <div style={field}>
            <input
              type={show ? "text" : "password"}
              style={input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label style={label}>Password</label>

            <span style={eye} onClick={() => setShow(!show)}>
              {show ? "🙈" : "👁️"}
            </span>
          </div>

          {/* OPTIONS */}
          <div style={options}>
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />{" "}
              Remember
            </label>

            <span style={link}>Forgot?</span>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={btn}
            onClick={handleLogin}
          >
            Login
          </motion.button>

          {/* FOOTER */}
          <p style={footer}>
            New user?{" "}
            <span onClick={() => navigate("/signup")} style={link}>
              Create account
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* 🔥 STYLES */

const container = {
  height: "100vh",
  background: "linear-gradient(135deg,#0f172a,#020617)",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const glow = {
  position: "absolute",
  width: "600px",
  height: "600px",
  background: "radial-gradient(circle, rgba(14,165,233,0.3), transparent)",
  top: "-100px",
  left: "-100px",
  filter: "blur(120px)",
  pointerEvents: "none",
};

const center = {
  zIndex: 2,
};

const card = {
  width: "350px",
  padding: "30px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  textAlign: "center",
};

const title = {
  marginBottom: "5px",
};

const subtitle = {
  fontSize: "14px",
  marginBottom: "20px",
  opacity: 0.7,
};

const field = {
  position: "relative",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  outline: "none",
};

const label = {
  position: "absolute",
  left: "12px",
  top: "-10px",
  fontSize: "12px",
  background: "#1e293b",
  padding: "0 5px",
};

const eye = {
  position: "absolute",
  right: "10px",
  top: "12px",
  cursor: "pointer",
};

const options = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
  marginBottom: "15px",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#0ea5e9",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const footer = {
  marginTop: "15px",
  fontSize: "13px",
};

const link = {
  color: "#38bdf8",
  cursor: "pointer",
};