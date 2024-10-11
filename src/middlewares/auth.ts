import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY as string;

export const generateToken = (req: Request, res: Response) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, SECRET_JWT_KEY, { expiresIn: "24h" });
  res.json({ token });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  

  if (!token) {
    res.status(401).send("Access token missing");
    return;
  }

  try {
    jwt.verify(token, SECRET_JWT_KEY, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.body.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
