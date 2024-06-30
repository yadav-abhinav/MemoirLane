import dotenv from "dotenv";
dotenv.config({
  path: [".env.local", ".env"],
});
import "./config/zod.config";
import express from "express";
import connect from "./db/connection";
import authRoutes from "./routes/auth.routes";
import verifyJWT from "./middleware/jwt";
import { CustomRequest } from "./entity/auth.entity";
import cors from "cors";
import logger from "./utils/logger";
import requestLogger from "./middleware/logger";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errHandler";

await connect();
const port = process.env.PORT ?? 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(requestLogger);
app.use(authRoutes);

app.get("/", verifyJWT, (req, res) => {
  const email = (req as CustomRequest).email;
  res.send(`Hello ${email}`);
});

app.use(errorHandler);
app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`);
});
