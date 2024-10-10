import dotenv from "dotenv";
import express, { Request, Response } from "express";
import router from "@/router/api";
import bodyParser from "body-parser";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());

app.use(router);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
