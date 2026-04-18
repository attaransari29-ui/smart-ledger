# 💰 SMART LEDGER

A **full-stack personal finance management system** that allows users to track income, expenses, categorize transactions, and generate professional financial reports.

Built with a **modern UI (glassmorphism + gradient glow)** and a scalable backend using **Node.js + MongoDB**.

---

## 🚀 What I Built

This project is not just CRUD — it includes:

### 🔐 Authentication System

* User Registration & Login
* JWT-based authentication
* Protected dashboard routes

### 📊 Dashboard System

* Real-time Balance, Income & Expense calculation
* Monthly filtering system
* Category-based analytics
* Responsive UI (mobile + desktop)

### ➕ Transaction Management

* Add transactions manually
* Edit & delete transactions
* Category system (Food, Travel, Bills, Shopping)
* User-specific data (each user sees their own data)

### 📈 Data Visualization

* Pie chart (Income vs Expense)
* Bar chart (Category analytics)
* Dynamic chart updates from backend data

### 📄 PDF Export (Fintech Style)

* Bank-statement-like PDF
* Summary (Balance, Income, Expense)
* Transaction table
* Category visualization

### 🎨 Premium UI/UX

* Glassmorphism design
* Gradient glow background
* Smooth animations (Framer Motion)
* Responsive mobile UI

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* Axios (API handling)
* Framer Motion (animations)
* Recharts (charts)
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication

### Other Tools

* jsPDF & jspdf-autotable (PDF export)

---

## 📁 Project Structure

```
SMART LEDGER/
│
├── frontend/
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   └── ParticlesBg.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── transactionController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── Transaction.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── node_modules/
│
├── package.json
└── README.md
├── .gitignore
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/smart-ledger.git
cd smart-ledger
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Auth Routes

* POST `/api/auth/register`
* POST `/api/auth/login`

### Transaction Routes

* GET `/api/transactions`
* POST `/api/transactions`
* PUT `/api/transactions/:id`
* DELETE `/api/transactions/:id`

---

## 📱 Responsive Design

* Desktop dashboard layout
* Mobile-friendly UI
* Optimized spacing & stacking

---

## 🌟 Future Improvements

* Dark/Light theme toggle
* Advanced analytics (yearly reports)
* Export to Excel
* Notifications system
* Cloud deployment

---

## 👨‍💻 Developer

**Attar Ansari**
Diploma in Information Technology
Interested in FUll Stack Development, AI & Cybersecurity

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🚀 Share it

---

## 📄 License

This project is open-source and free to use.
