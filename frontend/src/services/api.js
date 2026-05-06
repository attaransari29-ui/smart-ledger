import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-ledger-2r5j.onrender.com/api", // 🔥 TEMP HARD CODE
});

export default API;