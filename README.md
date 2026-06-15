# ⚙️ MindVault Backend

> Powering the MindVault second-brain experience.

This repository contains the **backend API** for **MindVault** — a modern second-brain web application designed to help users organize notes, ideas, tasks, reading lists, and knowledge in one place.

🚧 **Current Status:** Backend foundation completed • Frontend integration in progress

---

## 🧠 About MindVault

MindVault is being built as a personal knowledge management system where users can:

📝 Save notes  
💡 Store ideas  
✅ Track tasks  
🏷️ Organize using tags  
📚 Maintain reading lists  
🌐 Save useful web clips  
🔗 Share content

This repository handles the **server-side logic**, **database connection**, and **API architecture**.

---

## ✨ Features

### 🔐 Authentication System
- JWT-based authentication
- Secure password hashing with bcrypt

### 🍃 MongoDB Integration
- Cloud database using MongoDB Atlas
- Mongoose schema models

### 🧩 REST API Structure
Current API routes include:

#### Auth
```http
POST /api/v1/signup
```

#### Brain Sharing
```http
POST /api/v1/brain/share
```

#### Health Check
```http
GET /
```

---

## 🛠️ Tech Stack

### Backend Core
🟢 Node.js  
🚂 Express.js  
🟦 TypeScript

### Database
🍃 MongoDB Atlas  
📦 Mongoose

### Security
🔐 JWT Authentication  
🧂 bcryptjs Password Hashing

### Environment Management
⚙️ dotenv

---

## 📂 Project Structure

```bash
src/
├── db.ts
├── index.ts
└── middlewares.ts
```

---

## 🚀 Getting Started

### 1️⃣ Clone repository

```bash
git clone https://github.com/swastikjha008-jpg/mindvault-backend.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
PUBLIC_BASE_URL=http://localhost:5000
```

---

### 4️⃣ Start development server

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

## 🧪 API Testing

You can test endpoints using:

- Postman
- Thunder Client (VS Code)
- Hoppscotch

Example:

```http
POST /api/v1/signup
```

Request Body:

```json
{
  "name": "Swastik",
  "email": "example@gmail.com",
  "password": "password123"
}
```

---

## 🚧 Current Backend Status

### ✅ Completed
- Express server setup
- MongoDB connection
- JWT setup
- Password hashing
- Signup route
- Authentication middleware
- Brain share logic
- Environment variable support

### 🔄 In Progress
- Frontend ↔ Backend integration
- Notes CRUD API
- Tasks API
- Protected routes
- Data persistence across modules

### 🎯 Planned Features (V2)
- 🔐 Login system
- 📝 Notes CRUD
- 📚 Reading list persistence
- 💡 Ideas API
- ✅ Tasks API
- 🔍 Search system
- ☁️ Cloud sync
- 👥 Shareable public profiles

---

## 💭 Development Philosophy

MindVault is being developed with a focus on:

> **Clean architecture, simplicity, and scalable learning-focused development.**

The goal is to gradually evolve the app into a fully functional productivity system while following real-world full stack practices.

---

## 🤝 Contributions

Currently a personal learning + portfolio project.

Suggestions and feedback are welcome.

---

## 👨‍💻 Developer

Built by **Swastik** 🚀

Learning Full Stack Development through real projects.

---

## ⭐ Support

If you like the project, consider giving it a **star ⭐** on GitHub.
