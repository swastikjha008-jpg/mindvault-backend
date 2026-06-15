import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "JWT_SECRET is missing" });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & {
      userId?: string;
    };

    req.userId = decoded.userId || decoded.sub || undefined;

    if (!req.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};