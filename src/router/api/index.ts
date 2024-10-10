import controllers from "@/controllers";
import bodyParser from "body-parser";
import express from "express";

const router = express();

const textParser = bodyParser.text();

router.post("/api/justify", textParser, controllers.justifyController.justifyText);

export default router;
