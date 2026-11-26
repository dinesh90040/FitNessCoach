# 🛠️ Fitness Coach App — Backend Setup & Implementation Guide

This guide provides a complete, step-by-step blueprint for setting up, structuring, and running the backend for the **Fitness Coach App** using **Bun**, **Express + TypeScript**, and your **Local MongoDB** instance.

---

## 📌 1. Tech Stack & Environment

| Component | Technology | Version / Status | Notes |
| :--- | :--- | :--- | :--- |
| **Runtime & Package Manager** | [Bun](https://bun.sh/) | `v1.3.14` (Installed) | Native TypeScript support, zero-config `--watch` |
| **Framework** | Express + TypeScript | Latest | REST API architecture |
| **Database** | MongoDB (Local Service) | Running on Windows | `mongodb://127.0.0.1:27017/fitness_coach` |
| **ODM / Modeling** | Mongoose | Latest | Strongly typed schemas & validation |
| **Authentication** | JWT (`jsonwebtoken`) + `bcryptjs` | Latest | Password hashing & stateless session tokens |
| **Input Validation** | Zod | Latest | Strict schema validation for request payloads |

> [!NOTE]
> Your Windows system service **MongoDB Server (MongoDB)** is verified to be already **Running**. No extra installation of MongoDB is required!

---

## 📁 2. Recommended Directory Structure

Create a dedicated `server/` directory at the project root alongside the frontend:

```text
fitness-coach-app/
├── app/                  # Expo mobile app
├── components/           # Mobile UI components
├── theme/                # Design tokens
├── store/                # Zustand stores
├── server/               # 👈 Backend API Root
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts             # MongoDB Mongoose connection
│   │   ├── models/
│   │   │   └── User.ts           # Mongoose User model & interface
│   │   ├── controllers/
│   │   │   └── authController.ts # Logic for signup, login, getMe
│   │   ├── routes/
│   │   │   └── authRoutes.ts     # Express router endpoints
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT bearer verification middleware
│   │   └── index.ts              # Express server bootstrap
│   ├── .env                      # Environment secrets
│   ├── package.json              # Bun dependencies
│   └── tsconfig.json             # TypeScript configuration
├── BACKEND_SETUP_GUIDE.md
└── package.json          # Frontend dependencies
```

---

## ⚡ 3. Step-by-Step Backend Setup

### Step 1: Create `server` directory and initialize Bun

Open a PowerShell terminal in the project root:

```powershell
# 1. Create server directory & navigate into it
mkdir server
cd server

# 2. Initialize bun project
bun init -y
```

---

### Step 2: Install Dependencies

With Bun, package installation takes only seconds:

```powershell
# Core production packages
bun add express mongoose jsonwebtoken bcryptjs cors dotenv zod

# TypeScript type definitions
bun add -d @types/express @types/jsonwebtoken @types/bcryptjs @types/cors
```

---

### Step 3: Configure Environment Variables (`server/.env`)

Create `server/.env` with your local MongoDB connection and JWT secret:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/fitness_coach
JWT_SECRET=super_secret_fitness_coach_jwt_key_2026
JWT_EXPIRES_IN=7d
```

---

### Step 4: MongoDB Connection Helper (`server/src/config/db.ts`)

```typescript
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fitness_coach");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
```

---

### Step 5: User Model (`server/src/models/User.ts`)

Define the schema for authentication and user profiles:

```typescript
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // Don't return password by default in queries
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
```

---

### Step 6: Auth Controller (`server/src/controllers/authController.ts`)

Handles validation, password hashing, and token generation:

```typescript
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { z } from "zod";

// Zod schemas for input validation
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Helper to sign JWT
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "7d",
  });
};

// POST /api/auth/signup
export const signup = async (req: Request, res: Response) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        message: parsed.error.issues[0]?.message || "Validation error" 
      });
    }

    const { name, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        message: parsed.error.issues[0]?.message || "Validation error" 
      });
    }

    const { email, password } = parsed.data;

    // Fetch user and explicitly include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/auth/me
export const getMe = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
```

---

### Step 7: JWT Auth Middleware (`server/src/middleware/auth.ts`)

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as { id: string };
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
```

---

### Step 8: Routes & Server Entry (`server/src/index.ts`)

```typescript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { signup, login, getMe } from "./controllers/authController";
import { authenticate } from "./middleware/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, getMe);

app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Connect to DB and start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
```

---

### Step 9: Add Run Script to `server/package.json`

Add this script to `server/package.json`:

```json
{
  "scripts": {
    "dev": "bun --watch src/index.ts",
    "start": "bun src/index.ts"
  }
}
```

Now start the server:
```powershell
bun run dev
```

---

## 📱 4. Connecting the Mobile App to Local Backend

> [!IMPORTANT]
> **Crucial Mobile Networking Note:**
> When testing on a **physical phone** (via Expo Go) or **Android Emulator**:
> - `localhost` or `127.0.0.1` refers to the phone itself, **not** your development PC!
> - Your PC's local Wi-Fi IP address is: `10.94.216.68` (or your active network adapter IP).
> - In development, set your base API URL to:
>   ```typescript
>   export const API_BASE_URL = "http://10.94.216.68:5000/api";
>   ```
> - Both your computer and phone must be connected to the **same Wi-Fi network**.

---

## 🧪 5. Testing the Auth Endpoints

You can test the endpoints right from PowerShell before hooking them into the frontend:

### Test Signup:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"name":"Alex Rivers","email":"alex@example.com","password":"password123"}'
```

### Test Login:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"email":"alex@example.com","password":"password123"}'
```
