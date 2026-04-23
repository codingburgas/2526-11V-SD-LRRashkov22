# 💰 Personal Finance Tracker

A full-stack web application for managing personal finances, including transaction tracking, budgeting, analytics, and category management.

---
## 🌐 Live

🚀 **Try the app here:**  
👉 [Open Personal Finance Tracker] https://lecho.vanix.shop
---
### 🧪 Demo Account

- **Username:** `demo`
- **Password:** `demo`

⚠️ *This is a read-only account. Actions like creating transactions or editing data are disabled. Create one to use full functionality*
---
## 📸 Screenshots

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Analytics
![Analytics](./screenshots/accounts.png)
---

## 🚀 Overview

Personal Finance Tracker is a modular full-stack application built with ASP.NET Core and JavaScript, designed to help users manage their financial activity in a structured and intuitive way.

The application supports:
- Transaction tracking (income & expenses)
- Category-based budgeting
- Financial analytics with charts
- Account management
- Role-based features (Admin & User)
- Demo mode (read-only access)

---

## 🧠 Key Features

### 📊 Dashboard
- Real-time balance, income, and expenses overview
- Interactive chart (Chart.js) with multiple time ranges:
  - Daily (7 / 30 days)
  - Monthly
  - Yearly

### 💸 Transactions
- Add income and expenses
- Assign categories and accounts
- Filter by category
- View recent transactions

### 📈 Analytics
- Budget tracking per category
- Visual progress bars
- Pie charts for expenses and income distribution
- Monthly reset functionality

### 🗂 Category Management
- Create, update, and delete categories
- Set monthly budget limits
- Admin panel for default categories
- Setup flow for first-time users

### 🏦 Accounts
- Multiple account support (Bank, Wallet, etc.)

### 🔐 Authentication
- JWT-based authentication
- Role-based access (Admin/User)
- Demo account (read-only restrictions)

---

## 🏗 Architecture

The project follows a **modular architecture** with clear separation of concerns:

### Backend (ASP.NET Core)
- Controllers → API endpoints
- Services → business logic
- DTOs → data transfer
- Entity Framework Core → database access
- PostgreSQL → relational database

### Frontend (Vanilla JS + Bootstrap)
- Modular JS files (per feature/page)
- Fetch API for communication with backend
- Dynamic DOM updates (no page reload)
- Chart.js for data visualization

---

## 🔌 API Design

The backend exposes RESTful endpoints for:

- Transactions
- Categories
- Budgets
- Dashboard data
- Analytics
- Accounts
