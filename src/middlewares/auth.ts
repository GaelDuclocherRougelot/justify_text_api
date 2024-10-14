import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY as string;

export const generateToken = (req: Request, res: Response) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = (email: string) => emailRegex.test(email);

  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const token = jwt.sign({ email }, SECRET_JWT_KEY, { expiresIn: "24h" });
  res.status(200).json({ token });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    jwt.verify(token, SECRET_JWT_KEY, (err: any, user: any) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }
      req.body.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
