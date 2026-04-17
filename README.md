# 🚀 User Management System (MERN Stack)

A full-stack User Management System built using the MERN stack (MongoDB, Express.js, React, Node.js) with role-based access control.

---

## 🌐 Live Demo

* **Frontend:** [https://usermanagementsystm.netlify.app](https://usermanagementsystm.netlify.app/login)
* **Backend API:** [https://user-management-system-server-r5p6.onrender.com](https://user-management-system-server-r5p6.onrender.com)

---

## 🔐 Demo Credentials

| Role    | Email                                             | Password    |
| ------- | ------------------------------------------------- | ----------- |
| Admin   | [admin@example.com]                               | Admin@123   |
| Manager | [manager@example.com]                             | Manager@123 |
| User    | [user@example.com]                                | User@123    |

---

## ✨ Features

* 🔐 JWT Authentication (Login/Register)
* 👥 Role-based access (Admin, Manager, User)
* 📋 User Management (CRUD operations)
* 🔎 Search, Filter, Pagination
* 🧾 Profile Management
* 📊 Audit info (createdAt, updatedAt, updatedBy)
* 🌐 Fully deployed (Frontend + Backend)

---

## 🛠️ Tech Stack

* **Frontend:** React, Axios, CSS, HTML
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **Deployment:** Netlify (Frontend), Render (Backend)

---

## ⚙️ Setup Instructions (Local)

### 🔹 1. Clone repository

```bash
git clone [https://github.com/your-username/user-management-system.git](https://github.com/aaquib64/User-Management-System_Client)
cd user-management-system/client
```

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://aaquibshaikh64:Aaquibshaikh@cluster0.df0o5.mongodb.net/?appName=Cluster0
JWT_SECRET=Shaikh_Aaquib_User_Management_System_2026
```

Run backend:

```bash
npm start
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌱 Seed Data (Optional)

To populate demo users:

```bash
node seed.js
```

⚠️ Note: Do not run in production (it may overwrite data)

---

## 🧱 Project Structure

```
backend/
  ├── config/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── seed.js
  └── server.js

frontend/
  ├── src/
  ├── components/
  ├── pages/
  └── services/
```

---

## 📦 API Endpoints

### Auth

* POST `/api/auth/login`

### Users

* GET `/api/users`
* POST `/api/users`
* PUT `/api/users/:id`
* DELETE `/api/users/:id`
* GET `/api/users/me`

---

## 🗄️ Database Schema

### User Model

* name: String
* email: String (unique)
* password: String (hashed)
* role: enum (admin, manager, user)
* status: enum (active, inactive)
* createdBy: ObjectId (User)
* timestamps: createdAt, updatedAt

---

## ⚠️ Important Notes

* CORS configured for deployed frontend
* Environment variables required for backend
* Passwords should be hashed (bcrypt)

---

## 👨‍💻 Author

Aaquib Shaikh

---
