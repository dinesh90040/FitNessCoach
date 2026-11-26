import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db";
import { signup, login, getMe } from "./src/controllers/authController";
import { authenticate } from "./src/middleware/auth";
import { timeStamp } from "node:console";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, getMe);

app.use('/api/auth', authRouter);
app.get("/health", (req, res) => {
    res.json({ status: "Healthy", timeStamp: new Date().toISOString() });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on http://localhost:${PORT}`);
    });
});

