# 📦 Storage Backend System – Project Overview

## 🔰 Introduction

This project is a **secure, scalable backend system** built with **Node.js, Express.js, and MongoDB (Mongoose)**. It provides a complete solution for managing **user-based digital storage**, including **folders, notes, images, PDFs, favorites**, and a **dashboard summary** with storage analytics.

The system is designed with **authentication, authorization, storage limits, and modular architecture** in mind, making it suitable for real-world SaaS or cloud-storage–type applications.

---

## 🚀 Key Features

### 🔐 Authentication & Security

- JWT-based authentication
- Protected routes using middleware
- App-lock / access guard middleware
- User-specific data isolation

### 🗂️ Resource Management

- 📁 Folder management (create, read, organize)
- 📝 Notes management
- 🖼️ Image upload & tracking
- 📄 PDF upload & tracking
- ⭐ Favorite system

Each resource is strictly tied to the authenticated user.

---

## 📊 Dashboard System

The dashboard provides a **real-time summary** of user activity:

- Total folders, notes, images, and PDFs
- Storage usage calculation (used vs available)
- Recent activity feed
- Storage limit enforcement (e.g., 15GB/user)

> The dashboard intelligently supports mixed `userId` formats (string & ObjectId) and ensures accurate data retrieval.

---

## 🧠 Architecture Overview

### 📁 Project Structure

```
storage-backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── image/
│   │   ├── pdf/
│   │   ├── note/
│   │   ├── folder/
│   │   ├── favorite/
│   │   └── dashboard/
│   ├── middlewares/
│   ├── routes/
│   ├── config/
│   └── utils/
├── app.js
├── server.js
└── README.md
```

### 🧩 Modular Design

- Each feature is isolated into its own module
- Clean separation of routes, models, and logic
- Middleware-based request handling

---

## 🛠️ Tech Stack

| Layer         | Technology  |
| ------------- | ----------- |
| Runtime       | Node.js     |
| Framework     | Express.js  |
| Database      | MongoDB     |
| ODM           | Mongoose    |
| Auth          | JWT         |
| File Handling | Multer / FS |
| API Testing   | Postman     |

---

## 🔒 Middleware System

- `auth.middleware` – verifies JWT & user identity
- `appLock.middleware` – blocks access when app is locked
- Centralized error handling

---

## 📈 Storage Logic

- Each file tracks its size
- Dashboard calculates storage dynamically
- Prevents exceeding user storage limit
- Clean and extendable logic for future plans

---

## 🧪 API Usage

- RESTful API design
- JSON-based responses
- Consistent response structure:

```json
{
  "success": true,
  "data": {}
}
```

---

## 🎯 Use Cases

- Cloud storage backend
- Personal knowledge management system
- SaaS dashboard backend
- File & content organization platform

---

## 🌱 Future Improvements

- Storage plan tiers (Free / Pro / Enterprise)
- File sharing between users
- Activity logs & audit trail
- Aggregation-based dashboard optimization
- Migration to strict ObjectId normalization

---

## 👨‍💻 Author

**Reazul Islam Reaz**  
Backend-focused Full Stack Developer  
Passionate about building scalable systems with Node.js & MongoDB

---

## ✅ Status

✔ Core features implemented  
✔ Dashboard analytics working  
✔ Secure & production-ready foundation

---

> _This README provides a high-level overview of the system. Each module is designed to be independently extendable and production-ready._
