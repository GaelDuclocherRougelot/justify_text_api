import controllers from "@/controllers";
import { authenticateToken, generateToken } from "@/middlewares/auth";
import rateLimiter from "@/middlewares/rateLimiter";
import express from "express";

const router = express();

const textParser = express.text();
const jsonParser = express.json();

router.post("/api/token", jsonParser, generateToken);
router.post(
  "/api/justify",
  authenticateToken,
  textParser,
  rateLimiter,
  controllers.justifyController.justifyText
);

export default router;
