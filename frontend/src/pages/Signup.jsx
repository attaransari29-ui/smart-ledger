import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) return alert("Fill all fields");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created ✅");
      navigate("/");
    } catch {
      alert("Error creating account");
    }
  };

  return (
    <div style={container}>
      {/* 🔥 GLOW BACKGROUND */}
      <div style={glow}></div>

      <div style={center}>
        <div style={card}>
          <h2 style={title}>Create Account</h2>

          <input
            style={input}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={primaryBtn} onClick={handleSignup}>
            Create Account
          </button>

          <p style={bottomText}>
            Already have account?{" "}
            <span style={link} onClick={() => navigate("/")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* 🔥 SAME DASHBOARD THEME */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f172a,#020617)",
  color: "white",
  position: "relative",
};

const glow = {
  position: "fixed",
  width: "600px",
  height: "600px",
  background: "radial-gradient(circle, rgba(14,165,233,0.3), transparent)",
  top: "-100px",
  left: "-100px",
  filter: "blur(100px)",
  pointerEvents: "none",
};

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const card = {
  width: "350px",
  padding: "30px",
  borderRadius: "14px",

  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",

  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  outline: "none",

  background: "rgba(255,255,255,0.08)",
  color: "white",
};

const primaryBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",

  background: "#0ea5e9",
  border: "none",
  borderRadius: "8px",

  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const bottomText = {
  marginTop: "15px",
  textAlign: "center",
  fontSize: "14px",
};

const link = {
  color: "#38bdf8",
  cursor: "pointer",
};