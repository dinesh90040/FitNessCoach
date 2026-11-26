import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { request } from "node:http";

export interface AuthRequest extends Request {
    userId?: string;
}
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or malformed." });
    }


    const token = authHeader?.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as { id: string };
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};