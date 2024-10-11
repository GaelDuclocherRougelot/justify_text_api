import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY as string;

const generateToken = (email: string) => {
  const token = jwt.sign({ email }, SECRET_JWT_KEY, { expiresIn: "1h" });
  return token;
};

export default generateToken;
