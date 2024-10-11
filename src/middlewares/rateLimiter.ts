import { NextFunction, Request, Response } from "express";
const tokenUsage: { [key: string]: number } = {};
const maxTokenUsage = 80000;

const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"];
  const wordCount = req.body.split(" ").length;

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (!tokenUsage[token]) {
    tokenUsage[token] = 0;
  }

  tokenUsage[token] += wordCount;

  if (tokenUsage[token] > maxTokenUsage) {
    res.status(402).json({ message: "Payment Required" });
    return;
  }

  next();
};

export default rateLimiter;

