import router from "@/router/api";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(router);

const server = app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});

export { app, server };
