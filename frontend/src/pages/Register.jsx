import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) return toast.error("All fields required");

    try {
      await API.post("/auth/register", { email, password });

      toast.success("Account created 🎉");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch {
      toast.error("User already exists");
    }
  };

  return (
    <div className="auth-container">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="auth-card">

        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <div className="inputBox">
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Email</label>
        </div>

        <div className="inputBox">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>

          <span className="eye" onClick={() => setShow(!show)}>
            {show ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleSignup} className="btn">Signup</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <a href="/">Login</a>
        </p>

      </motion.div>
    </div>
  );
}